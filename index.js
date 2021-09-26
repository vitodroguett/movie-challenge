const koa = require('koa')
const koaRouter = require('koa-router')

const app = new koa()
const router = new koaRouter()

router.get('home', '/', (context) => {
  context.body = "Welcome to my Koa.js Server"
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000);