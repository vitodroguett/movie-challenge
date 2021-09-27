const logger = require('koa-logger')
const koa = require('koa');
const Sentry = require("@sentry/node");
const dotenv = require('dotenv');
const app = new koa();
app.use(logger());

Sentry.init({ dsn: "https://dd2f331f89ef435987811d9417e37f31@o940998.ingest.sentry.io/5979966" });

app.on("error", (err, ctx) => {
  Sentry.withScope(function (scope) {
    scope.addEventProcessor(function (event) {
      return Sentry.Handlers.parseRequest(event, ctx.request);
    });
    Sentry.captureException(err);
  });
});

dotenv.config();

const connection = require('./repositories/connection');

var movies = require('./routes/movies');
app.use(movies.routes())
  .use(movies.allowedMethods());

app.listen(process.env.PORT || 3000);