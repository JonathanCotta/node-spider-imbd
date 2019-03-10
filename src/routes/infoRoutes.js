const info = require('../controllers/infoController');

module.exports = (app) => {
  app.get('/api/v1/info', info.v1);
};
