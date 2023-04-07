/*
    1. Affiche confirmation

    2. Enlever confirmation
*/

var remove_icons = document.querySelectorAll(".remove_icon"),
    page_conf = document.querySelector(".page_conf"),
    title_conf = document.getElementById("title_conf"),
    text_conf = document.getElementById("text_conf"),
    link_conf = document.getElementById("link_conf"),
    ct = document.getElementById("ct");

// 1
for(let i=0; i<remove_icons.length; i++){
    remove_icons[i].addEventListener("click", () =>{
        title_conf.textContent = remove_icons[i].getAttribute("title-conf")
        text_conf.textContent = remove_icons[i].getAttribute("text")
        link_conf.setAttribute("href", remove_icons[i].getAttribute("link"))
        ct.style.setProperty("display", "block", "important")

        page_conf.classList.add("show_screen_position");
    })
}

var exit_conf = document.getElementById("exit_conf");
// 2
exit_conf.addEventListener("click", () =>{
    page_conf.classList.remove("show_screen_position")
})


