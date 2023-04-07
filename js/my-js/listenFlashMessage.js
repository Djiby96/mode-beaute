/*
   1. Afficher le message flash
*/

// 1
var message_alert = document.getElementById("message_alert");
var messageFlash = message_alert.getAttribute("message");

if(messageFlash){
    var type = messageFlash.split("/")[0],
        message = messageFlash.split("/")[1];
    if(type == "success"){
        message_alert.classList.add("alert-success")
    }else{
        message_alert.classList.add("alert-danger")
    }   
    message_alert.textContent = message;
    message_alert.style.setProperty("display", "block", "important");
}