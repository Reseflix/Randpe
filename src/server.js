const express = require('express')
const session = require('cookie-session')
const path = require('path')
const passport = require('./middle/passport')()
const router = require('./express_exts/routes')()
const port = 5000
const template = path.join(__dirname,'template')
const sessionmiddle = session({
        secret:"Caminhando para lugares desconhecidos",
        name:"65gmkd5fd8",
        resave: false,
        saveUninitialized: false,
        maxAge: 24 * 60 * 60 * 1000})

const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(sessionmiddle)
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine','ejs')
app.set('views',template)
app.use(express.static(template))
app.use(router)

const server = require('http').createServer(app)
const io = require('./express_exts/websocket')(server,sessionmiddle)
server.listen(port,() => {console.log(`Running RandPe in ${port}`)})