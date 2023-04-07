/*
   1. Afficher le menu

   2. Cacher le menu
*/

var button_navbar = document.getElementById("button_navbar"),
    container_menu = document.querySelector(".container_menu"),
    menu = document.querySelector(".menu");

// 1
button_navbar.addEventListener("click", () =>{
    container_menu.classList.add("show_container_menu")
    menu.classList.add("show_menu");
})

var exit_menu = document.getElementById("exit_menu");
exit_menu.addEventListener("click", () =>{
    container_menu.classList.remove("show_container_menu")
    menu.classList.remove("show_menu");
})