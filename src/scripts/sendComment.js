function sendComment(){
 let name  = document.getElementById('connect-name');
 let mail  = document.getElementById('connect-mail');
 let message  = document.getElementById('connect-message-text');

 if (
    name.value != '' &&
    mail.value != '' &&
    message.value != ''
  ){
    var form = document.getElementById('connect-form');
    var data = new FormData(form);
    try{
      var request = new XMLHttpRequest();
      request.open('POST', 'http://free.ru', true);
      request.setRequestHeader('accept', 'application/json');
      request.send(data);
      request.onreadystatechange = function () {
        if (request.readyState < 4)
            console.log('loading');
        else if (request.readyState === 4) {
            if (request.status == 200 && request.status < 300)
              console.log('success');
            else
              console.log('failure');
        }
      };
    }
    catch(e){
      alert('Возникла ошибка! ' + e);
    }
  
 }
 else{
   alert("Не все поля формы заполнены");
 }
 
}

let name  = document.getElementById('connect-form');

name.onsubmit=()=>{sendComment(); return false;};