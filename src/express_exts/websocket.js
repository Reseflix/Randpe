module.exports = (server,session) => {
    const {database} = require('../middle/database')
    const io = require('socket.io')(server)
    const passport = require('passport')
    // documentation:https://github.com/socketio/socket.io/blob/master/examples/passport-example/index.js
    //https://socket.io/docs/v3/middlewares/
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)

    io.use((socket, next) => {session(socket.request, socket.request.res, next)})
    io.use(wrap(passport.initialize()))
    io.use(wrap(passport.session()))
    io.on('connection',socket => {
        console.log(socket.request.isAuthenticated())
        console.log(socket.request.user)
        socket.on('me', async data => {
            const user = (await database.info.user(data))[0]       
            socket.emit('me',user)
            let chat = []
            for (let friend in user.contacts){
                chat.push(user.contacts[friend])
            }
            if(chat[0]){
                const mens = await database.info.message(chat)
                socket.emit('messages',mens)
            }
        })
    
        socket.on('friends',async data =>{
            if(data[0]){
                socket.emit('friends',await database.info.friend(data))
            }
        })
    })

    return io
}