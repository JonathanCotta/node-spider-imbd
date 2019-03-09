const imdb = require('../controllers/imdbController');

module.exports = (app) => {
  app.get('/api/v1/imdb/search/', imdb.search);
};
