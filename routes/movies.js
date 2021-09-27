const koaRouter = require('koa-router');
const koaBody = require('koa-body');
const movieService = require("../services/movies");
const validations = require("./validationMiddleware");

var router = koaRouter({
    prefix: '/movies'
});

router.get('/search', validations.sarchValidate, async ctx => {
    try {
        const result = await movieService.search({ s: ctx.query.s, year: ctx.headers.year });
        ctx.body = result;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.message = "Ha ocurrido un error inesperado.";
    }
});

router.get('/', validations.getValidate, async ctx => {
    try {
        const result = await movieService.get(input.headers);
        ctx.body = result;
    }
    catch (error) {
        ctx.response.status = 500;
        ctx.response.message = "Ha ocurrido un error inesperado.";
    }
});

router.post('/replace', validations.replaceValidate, koaBody(), async ctx => {
    try {
        const result = await movieService.replace({ movie: ctx.request.body.movie, find: ctx.request.body.find, replace: ctx.request.body.replace });
        ctx.body = result;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.message = "Ha ocurrido un error inesperado.";
    }

});

module.exports = router;