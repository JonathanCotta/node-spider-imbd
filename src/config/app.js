const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const consign = require('consign');

const app = express();

app.set('PORT', process.env.PORT || 8888);

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.disable('x-powered-by');

consign({ cwd: 'src' })
  .include('routes')
  .into(app);

module.exports = app;
