const request = require("request");
const cheerio = require("cheerio");
const writeFile = require("fs").writeFile;

module.exports = (req, res) => {

    request('https://www.imdb.com/title/tt1229340/', (error, response, html) => {

        if (error) {
            console.log(error);
            res.sendStatus(500);
        }

        let $ = cheerio.load(html);

        let json = {
            title: $("h1[itemprop='name']").children().remove().end().text().trim(),
            originalTitle: $(".originalTitle").children().remove().end().text(),
            release: $("meta[itemprop='datePublished']").prop("content"),
            rating: $("span[itemprop='ratingValue']").text()
        };

        writeFile('./output/output.json', JSON.stringify(json, null, 4), function (error) {           
            console.log('File successfully written! - Check your project directory for the output.json file');
        });

        res.sendStatus(200);
    });
};