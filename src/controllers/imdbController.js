const axios = require('axios');
const cheerio = require('cheerio');

async function getShows(urls) {
  return new Promise((resolve, reject) => {
    if (!urls) reject();

    const results = [];
    let $ = null;

    urls.forEach((url) => {
      axios.get(url)
        .then((response) => {
          $ = cheerio.load(response.data);
          results.push({
            title: $('.title_wrapper h1')
              .children()
              .remove()
              .end()
              .text()
              .trim(),
            originalTitle: $('.originalTitle')
              .children()
              .remove()
              .end()
              .text(),
            release: $("a[title='See more release dates']").text().trim(),
            rating: $("span[itemprop='ratingValue']").text(),
          });
          console.log(results);
          if (results.length === urls.length) resolve(results);
        })
        .catch(err => reject(err));
    });
  });
}

async function search(req, res) {
  const showsURLs = [];
  const searchURL = `https://www.imdb.com/find?q=${req.query.q.trim().replace(/ /g, '+')}&title_type=feature`;

  let $ = null;

  axios.get(searchURL)
    .then((response) => {
      $ = cheerio.load(response.data);

      $('.result_text a').each((i, el) => {
        showsURLs.push(`https://www.imdb.com${$(el).prop('href')}`);
      });

      return showsURLs;
    })
    .then(urls => getShows(urls))
    .then(result => res.status(200).json({ result }))
    .catch(err => res.status(500).json(err));
}

module.exports = {
  search,
};
