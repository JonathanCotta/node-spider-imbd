const imdb = require('../controllers/imdbController');

module.exports = (app) => {
  // Cinema
  app.get('/api/v1/imdb/search/movies', imdb.movies);

  // TV
  app.get('/api/v1/imdb/search/tv/short', imdb.tvShort);
  app.get('/api/v1/imdb/search/tv/movies', imdb.tvMovies);
  app.get('/api/v1/imdb/search/tv/special', imdb.tvSpecial);
  app.get('/api/v1/imdb/search/tv/series', imdb.tvSeries);
  app.get('/api/v1/imdb/search/tv/miniseries', imdb.tvMiniseries);

  // Others
  app.get('/api/v1/imdb/search/games', imdb.games);
  app.get('/api/v1/imdb/search/short', imdb.short);
  app.get('/api/v1/imdb/search/documentary', imdb.documentary);
};
