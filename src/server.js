const express = require('express')
const session = require('express-session')
const path = require('path')
const router = require('./express_exts/routes')

const port = 5000
const template = path.join(__dirname,'template')
const sessionmiddle = session({
        secret:"RandPe Secret",
        name:"65gmkd5fd8",
        resave: false,
        saveUninitialized: false,
        cookie:{secure: false, maxAge: 24 * 60 * 60 * 1000}})

const app = express()
app.set('trust proxy',1)
app.set('view engine','ejs')
app.set('views',template)
app.use(express.static(template))
app.use(sessionmiddle)
app.use(router)

const server = require('http').createServer(app)
const io = require('./express_exts/websocket')(server,sessionmiddle)
server.listen(port,() => {console.log(`Running RandPe in ${port}`)})