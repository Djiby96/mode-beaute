/*
   1. Choisir le petit image cliquer
*/

// 1
var small_imgs = document.querySelectorAll(".small_imgs"),
    img_dt = document.getElementById("img_dt");
small_imgs.forEach((img) =>{
    img.addEventListener("click", () =>{
        var src = img.getAttribute("src");
        img_dt.setAttribute("src", src);
    })
})    