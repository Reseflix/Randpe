module.exports = (server,session) => {
    console.log('?')
    const {database} = require('../middle/database')
    const io = require('socket.io')(server)
    
    io.use((socket, next) => {
        session(socket.request, socket.request.res, next);
    })
    io.on('connection',socket => {
        
        socket.on('me', async data => {
            const user = (await database.info.user(data))[0]       
            socket.emit('me',user)
            console.log(user.contacts)
            let chat = []
            for (let friend in user.contacts){
                chat.push(user.contacts[friend])
            }
            const mens = await database.info.message(chat)
            socket.emit('messages',mens)
            
        })
    
        socket.on('friends',async data =>{
            socket.emit('friends',await database.info.friend(data))
        })
    })

    return io
}