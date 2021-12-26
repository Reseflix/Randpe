var rand;

class jsonrandpe {
    constructor() {
        this.id = 1;
        this.socket = io();
        this.chat = new managerchat();
        this.randme = '';
        this.randfriends = '';
        this.onevents();
        this.socket.emit('me',this.id);
    }
    
    onevents() {
        this.socket.on('me',(data) =>{
            console.log(data);
            this.randme = data;
            this.friends();
        });

        this.socket.on('friends',data => {
            console.log(data);
            this.randfriends = data;
            this.loadpage();
        })

        this.socket.on('messages',data=>{
            let temp = {};
            for (let mens in data){
                if(!temp[data[mens].idchat]){
                    temp[data[mens].idchat] = {};
                } 
                if(!temp[data[mens].idchat][data[mens].id]){
                    temp[data[mens].idchat][data[mens].id] = data[mens].message;
                }
            }
            this.randmessages = temp;
        })
    }
    
    friends() {
        if(this.randme.contacts){
            let temp = [];
            for (const friend in this.randme.contacts){
                temp.push(friend);
            }
            this.socket.emit('friends',temp);
        }
    }

    loadpage(){
        this.randfriends.forEach(element => {
            this.chat.menucontactsadd(element.id,element.randpeuser,'Sem banco de dados',0);
        });
    }

    selectcontact(e){
        let chat;
        let message;
        if(chat = this.randmessages[String(e.id)]){
            this.chat.chatclear();
            for (message in chat){
                console.log(chat[message])
                this.chat.chatadd(chat[message].message,chat[message].id == this.id ? 0 : 1);
            }
        }
    }
}

window.onload = () => {
    rand = new jsonrandpe();
}