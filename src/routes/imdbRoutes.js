const router = require('express').Router();

const imdb = require('../controllers/imdbController');

router.get('/search/', imdb.search);

module.exports = router;
