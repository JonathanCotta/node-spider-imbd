const axios = require('axios');
const cheerio = require('cheerio');

function getPages(urls = []) {
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

function search(title, type) {
  const cleanTitle = title.trim().replace(/ /g, '+');
  const searchURL = `https://www.imdb.com/search/title?title=${cleanTitle}&title_type=${type}`;

  let $ = null;

  return axios.get(searchURL)
    .then(({ data }) => {
      $ = cheerio.load(data);

      return $('.lister-item-header a').map((i, el) => (`https://www.imdb.com${$(el).prop('href')}`)).get();
    })
    .then(urls => getPages(urls));
}

// Cinema
async function movies(req, res) {
  try {
    const { query: { title } } = req;
    const result = await search(title, 'feature');

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
}

// TV
async function tvMovies(req, res) {
  try {
    const { query: { title } } = req;
    const result = await search(title, 'tv_movie');

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function tvShort(req, res) {
  try {
    const { query: { title } } = req;
    const result = await search(title, 'tv_short');

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function tvSpecial(req, res) {
  try {
    const { query: { title } } = req;
    const result = await search(title, 'tv_special');

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function tvSeries(req, res) {
  try {
    const { query: { title } } = req;
    const result = await search(title, 'tv_series');

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function tvMiniseries(req, res) {
  try {
    const { query: { title } } = req;
    const result = await search(title, 'tv_miniseries');

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
}

// Others
async function games(req, res) {
  try {
    const { query: { title } } = req;
    const result = await search(title, 'video_games');

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function short(req, res) {
  try {
    const { query: { title } } = req;
    const result = await search(title, 'short');

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function documentary(req, res) {
  try {
    const { query: { title } } = req;
    const result = await search(title, 'documentary');

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
}

module.exports = {
  movies,
  tvShort,
  tvMovies,
  tvSeries,
  tvSpecial,
  tvMiniseries,
  games,
  short,
  documentary,
};
