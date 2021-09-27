const logger = require('koa-logger')
const koa = require('koa');
const dotenv = require('dotenv');
const app = new koa();
app.use(logger());
dotenv.config();

const connection = require('./repositories/connection');

var movies = require('./routes/movies');
app.use(movies.routes())
  .use(movies.allowedMethods());

app.listen(3000);