/*
    1. Cacher la pagination si il y a un seul lien
*/

const pagination = document.querySelector(".pagination"),
      page_links = document.querySelectorAll(".page-link");

// 1
if(page_links.length <=1){
    pagination.style.display = "none";
}else{
    for(let i = 0; i<page_links.length; i++){
        var page_number = page_links[i].textContent;
        if(page_number.length >= 3){
            page_links[i].innerHTML = "<i class='fas fa-arrow-right' aria-hidden='true'></i>";
        }
    }
}

