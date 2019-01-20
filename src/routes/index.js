const router = require('express').Router();
const imdbRoutes = require('./imdbRoutes');

router.use('/imdb', imdbRoutes);

module.exports = router;
