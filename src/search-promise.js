const cheerio = require("cheerio");
const Promise = require("bluebird");
const rp = require("request-promise");
const writeFile = Promise.promisify(require("fs").writeFile);

let scraper = (urls) => {

    return new Promise((resolve, reject) => {

        if (urls === null) reject();

        let results = [];

        urls.forEach((url, i) => {

            rp(url, { transform: (body) => cheerio.load(body) })
                .then(($) => {
                    results.push({
                        title: $("h1[itemprop='name']").children().remove().end().text().trim(),
                        originalTitle: $(".originalTitle").children().remove().end().text(),
                        release: $("meta[itemprop='datePublished']").prop("content"),
                        rating: $("span[itemprop='ratingValue']").text()
                    });

                    if (results.length === urls.length) resolve(results);
                })
                .catch(err => reject(err));
        });
    });
};

module.exports = (req, res) => {

    let url = "https://www.imdb.com/find?q=" + req.params.query.trim().replace(/ /g, "+");

    rp(url, { transform: (body) => cheerio.load(body) })
        .then(($) => {

            let urls = [];

            $(".result_text a").each((i, el) => {
                urls.push("https://www.imdb.com" + $(el).prop('href'));
            });

            return urls;
        })
        .then(urls => scraper(urls))
        .then((results) => {
            
            writeFile("./output/promise-search-output.json", JSON.stringify(results, null, 4))
            .then(() => {
                console.log(results.length + " results writed in the file promise-search-output");
                res.sendStatus(200);
            });               
        })            
        .catch ((err) => {
        console.log(err);
        res.sendStatus(500);
    });
};