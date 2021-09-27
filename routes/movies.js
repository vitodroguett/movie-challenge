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
        if (result === undefined || result.length == 0) {
            ctx.response.status = 404;
            ctx.response.message = "Sin resultados.";
        } else {
            ctx.body = result;
        }
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.message = "Ha ocurrido un error inesperado.";
    }
});

router.get('/', validations.getValidate, async ctx => {
    try {
        const result = await movieService.get({ page: ctx.headers.page });

        if (result?.movies === undefined || result.movies.length == 0) {
            ctx.response.status = 404;
            ctx.response.message = "Sin resultados.";
        } else {
            ctx.body = result;
        }
    }
    catch (error) {
        ctx.response.status = 500;
        ctx.response.message = "Ha ocurrido un error inesperado.";
    }
});

router.post('/replace', validations.replaceValidate, koaBody(), async ctx => {
    try {
        const result = await movieService.replace({ movie: ctx.request.body.movie, find: ctx.request.body.find, replace: ctx.request.body.replace });
        if (result === undefined || result.trim() === '') {
            ctx.response.status = 404;
            ctx.response.message = "Sin resultados.";
        } else {
            ctx.body = result;
        }
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.message = "Ha ocurrido un error inesperado.";
    }

});

module.exports = router;