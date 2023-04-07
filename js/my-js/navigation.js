/*
   1. Afficher le lien ajouter un produit pour le proprietaire en utilisant le cookie(proprio)
*/

// 1
var link_admin = document.getElementById("link_admin");
var proprio = Cookie.getCookie("proprio")
if(proprio){
   link_admin.style.setProperty("display", "block", "important");
}
