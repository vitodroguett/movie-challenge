const koaRouter = require('koa-router');
const axios = require("axios");
const joi = require('joi')
const validate = require('koa-joi-validate')

var router = koaRouter({
    prefix: '/movies'
});

const getValidate = validate({
    headers: {
        "year": joi.number()
    },
    query: {
        s: joi.string().required()
    },
    params: {
        // URL path parameters Joi validation object
    },
    body: {
        // POST body Joi validation object
    }
})

router.get('/', getValidate, async ctx => {
    let movies = await axios.get(process.env.URL_API + "&s=" + ctx.request.query.s + "&y=" + ctx.request.headers.year);
    ctx.body = movies.data;
});


module.exports = router;