const http = require('http');

const app = require('./config/app');

http.createServer(app).listen(app.get('PORT'), () => {
  // eslint-disable-next-line no-console
  console.log(`server is runing on http://localhost:${app.get('PORT')}/api/`);
});
