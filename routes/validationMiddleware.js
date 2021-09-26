const joi = require('joi')
const validate = require('koa-joi-validate')

const sarchValidate = validate({
    headers: {
        year: joi.number()
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
});

const getValidate = validate({
    headers: {
        page: joi.number()
    },
    query: {
        
    },
    params: {
        // URL path parameters Joi validation object
    },
    body: {
        // POST body Joi validation object
    }
});

module.exports = { sarchValidate, getValidate }