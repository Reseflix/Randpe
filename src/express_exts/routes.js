module.exports = (() => {
    const express = require('express')
    const router = express.Router()
    // Chat do Usuario
    router.get(['/','/chat'],(req,res) => {
        res.render('chat')
    })
    router.get('/test',(req,res) => {
        req.session.num += 1
        res.render('test',{something:req.session.num})
    })
    return router
})()
