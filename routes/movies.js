const koaRouter = require('koa-router');
const movieService = require("../services/movies");
const validations = require("./validationMiddleware");

var router = koaRouter({
    prefix: '/movies'
});

router.get('/search', validations.sarchValidate, async ctx => {
    ctx.body = await movieService.search({ s: ctx.request.query.s, year: ctx.headers.year });
});

router.get('/', validations.getValidate, async ctx => {
    ctx.body = await movieService.get({ page: ctx.headers.page });
});

module.exports = router;