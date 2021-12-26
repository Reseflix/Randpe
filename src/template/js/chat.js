var rand;

function showmenssage(e){
  console.log(e);
}

function filter() {
    var val = document.getElementById('search').value.toUpperCase();
    var contacts = document.getElementsByClassName('people');
  
    for (i=0;i <= contacts.length-1;i++){
      if(val !== undefined && val !== ""){
        if(String(contacts[i].getElementsByClassName('name')[0].innerText.toUpperCase()).includes(val)) {
          contacts[i].style.display = '';
        } else {
          contacts[i].style.display = 'none';
        }
      } else {
        contacts[i].style.display = '';
      }  
    }
  }

  class managerchat {
      constructor() {
        this.chat = document.getElementById('chat');
        this.menu = document.getElementById('menu-section');
        this.search = document.getElementById('search').value.toUpperCase();
        this.contactslist =  document.getElementsByClassName('people');
      }

      // Adicionar os contatos ao menu 
      // status = 0: Sem nova mensagem, 1: com nova mensagem
      menucontactsadd(id,name,last,status){
        let typestatus = status == 1 ? 'people newme' : 'people';
        this.menu.innerHTML += `
        <div id="${id}" class="${typestatus}" onclick="rand.selectcontact(this)">
            <div class="pic"><img src=""/></div>
            <div class="info">
                <div class="name">${name}</div>
                <div class="last">${last}</div>
            </div>
        </div>
      `;
      }
      // limpeza do menu de contatos 
      menucontactsclear() {
          this.menu.innerHTML = '';
      }
      // adicionando as mensagens
      // message ira ser torna um arquivo json
      chatadd(message,status) {
          let typestatus = 'content ' + (status == 0 ? 'send' : 'receive');
          this.chat.innerHTML += `
            <div class="message"><span class="${typestatus}">${message}</span><span class="datetime">12:00</span></div>
          `;
      }
      // limpeza das mensagens
      chatclear() {
        this.chat.innerHTML = '';
    }
  }


  