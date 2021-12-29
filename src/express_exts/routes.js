module.exports = () => {
    const passport = require('passport')
    const express = require('express')
    const app = express.Router()
    // funções 
    function logged(req,res,next) {
        if(!req.isAuthenticated() && !req.session.passport.user){res.redirect('/login')} 
        next()
    }
    function logout(req,res,next) {
        if(req.isAuthenticated() && req.session.passport.user){req.logout()}
        next() 
    }
    // rotas

    app.route('/login')
        .get((req,res) => {
            res.render('login',{viewcount:0})
            res.end()
        })
        .post(passport.authenticate('local',{
                successRedirect:'/',
                failureRedirect:'/login',
                passReqToCallback: true})
        )
          
    app.get('/logout',logout,(req,res) => {
        res.redirect('/login')
    })
    
    app.get(['/','/chat'],logged,(req,res) => {res.render('chat')})
    // retorno
    return app
}
