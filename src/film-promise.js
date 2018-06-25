const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = (req, res) => {
    rp("https://www.imdb.com/title/tt1229340/", { transform: (body) => cheerio.load(body) })
        .then(($) => {
            return film = {
                title: $("h1[itemprop='name']").children().remove().end().text().trim(),
                originalTitle: $(".originalTitle").children().remove().end().text(),
                release: $("meta[itemprop='datePublished']").prop("content"),
                rating: $("span[itemprop='ratingValue']").text()
            };
        })
        .then((film) => {
            fs.writeFile('./output/promise-output.json', JSON.stringify(film, null, 4), (err) => {
                if (err) throw err;
                console.log('File successfully written! - Check your project directory for the promise-output.json file');
                res.sendStatus(200);
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};