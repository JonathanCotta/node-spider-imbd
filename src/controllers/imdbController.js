const axios = require('axios');
const cheerio = require('cheerio');

function getShows(urls = []) {
  return new Promise((resolve, reject) => {
    if (urls.length === 0) reject();

    const result = urls.map(async (url) => {
      const { data } = await axios.get(url);

      const $ = cheerio.load(data);

      const html = $('script[type="application/ld+json"]').html();

      const {
        name,
        genre,
        datePublished,
        aggregateRating,
      } = JSON.parse(html);

      return {
        name,
        genre,
        datePublished,
        rating: aggregateRating ? aggregateRating.ratingValue : '',
      };
    });

    resolve(Promise.all(result));
  });
}

async function search(req, res) {
  const searchURL = `https://www.imdb.com/search/title?title=${req.query.q.trim().replace(/ /g, '+')}&title_type=feature`;

  let $ = null;

  axios.get(searchURL)
    .then((response) => {
      $ = cheerio.load(response.data);

      return $('.lister-item-header a').map((i, el) => (`https://www.imdb.com${$(el).prop('href')}`)).get();
    })
    .then(urls => getShows(urls))
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
}

module.exports = {
  search,
};
