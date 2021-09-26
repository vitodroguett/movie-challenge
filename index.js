const koa = require('koa');
const dotenv = require('dotenv');

const app = new koa();
dotenv.config();

var movies = require('./routes/movies');
app.use(movies.routes())
  .use(movies.allowedMethods());

app.listen(3000);