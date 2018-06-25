const request = require("request");
const cheerio = require("cheerio");
const writeFile = require("fs").writeFile;

let filmsUrl, json, $;

module.exports = (req, res) => {

    json, filmsUrl = [];

    let query = "https://www.imdb.com/find?q=" + req.params.query.trim().replace(/ /g, "+");   

    request(query, (error, response, html) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        }

        $ = cheerio.load(html);

        $(".result_text a").each((i, el) => {
            filmsUrl.push("https://www.imdb.com" + $(el).prop('href'));
        });

        scraper();

        res.sendStatus(200);
    });
};

function scraper() { 

    filmsUrl.forEach((url, i) => {

        request(url, (error, response, html) => {

            let $ = cheerio.load(html);

            let film = {
                title: $("h1[itemprop='name']").children().remove().end().text().trim(),
                originalTitle: $(".originalTitle").children().remove().end().text(),
                release: $("meta[itemprop='datePublished']").prop("content"),
                rating: $("span[itemprop='ratingValue']").text()
            };            

            json.push(film);

            if (json.length === filmsUrl.length) {
                console.log("scraping done ! with " + filmsUrl.length + " results. \n");
                fileWriter();
            }
        });
    });
}

function fileWriter() {
    writeFile('./output/search_output.json', JSON.stringify(json, null, 4), function (error) {
        console.log('File successfully written! - Check output folder for search_output.json file');
    });
}