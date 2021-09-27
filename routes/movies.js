const koaRouter = require('koa-router');
const koaBody = require('koa-body');
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

router.post('/replace', validations.replaceValidate, koaBody(), async ctx => {
    console.log(ctx.request.body);
    ctx.body = await movieService.replace({ movie: ctx.request.body.movie, find: ctx.request.body.find, replace: ctx.request.body.replace });
});

module.exports = router;