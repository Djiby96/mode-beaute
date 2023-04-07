/*
  1. Changer le texte et la couleur du titre, remplir le menu de lien et l'element select de type vetements ou chaussures

  2. Changer l'URL si le choix du prix est selectionnee

  3. Changer l'URL si le choix du type est selectionnee

  4. Selectionner le prix correspondant s'il existe dans l'url au chargement de la page

  5. Selectionner le type correspondant s'il existe dans l'url au chargement de la page

*/

// 1
var title_page = document.getElementById("title_page"),
    sub_category = document.getElementById("sub_category"),
    st = document.getElementById("st");

var pathname = URLQueryString.getPathName();
if(pathname == "/homme/vetements"){
    title_page.textContent = "vêtements homme";
    title_page.classList.add("bg-black");
    st.insertAdjacentHTML('afterbegin', `<option value='' class='text-center'>type vêtements</option>`)

    SubCategorieData.homme.vetements.forEach((value, key) =>{
        sub_category.insertAdjacentHTML('beforeend', `<a href='/homme/vetements?type=${value}' class="py-2 px-3 text-white rounded bx-s-2 fs-085 m-2 op-07 hover-bx-s-10 hover-op-1 bg-black">${key}</a>`)
        st.insertAdjacentHTML('beforeend', `<option value='${value}' class='text-center'>${key}</option>`)
    });
}else if(pathname == "/homme/chaussures"){
    title_page.textContent = "chaussures homme";
    title_page.classList.add("bg-black");
    st.insertAdjacentHTML('afterbegin', `<option value='' class='text-center'>type chaussures</option>`)

    SubCategorieData.homme.chaussures.forEach((value, key) =>{
        sub_category.insertAdjacentHTML('beforeend', `<a href='/homme/chaussures?type=${value}' class="py-2 px-3 text-white rounded bx-s-2 fs-085 m-2 op-07 hover-bx-s-10 hover-op-1 bg-black">${key}</a>`)
        st.insertAdjacentHTML('beforeend', `<option value='${value}' class='text-center'>${key}</option>`)
    });
}else if(pathname == "/femme/vetements"){
    title_page.textContent = "vêtements femme";
    title_page.classList.add("bg-orange-woman");
    st.insertAdjacentHTML('afterbegin', `<option value='' class='text-center'>type vêtements</option>`)

    SubCategorieData.femme.vetements.forEach((value, key) =>{
        sub_category.insertAdjacentHTML('beforeend', `<a href='/femme/vetements?type=${value}' class="py-2 px-3 text-white rounded bx-s-2 fs-085 m-2 op-07 hover-bx-s-10 hover-op-1 bg-orange-woman">${key}</a>`)
        st.insertAdjacentHTML('beforeend', `<option value='${value}' class='text-center'>${key}</option>`)
    });
}else{
    title_page.textContent = "chaussures femme";
    title_page.classList.add("bg-orange-woman");
    st.insertAdjacentHTML('afterbegin', `<option value='' class='text-center'>type chaussures</option>`)

    SubCategorieData.femme.chaussures.forEach((value, key) =>{
        sub_category.insertAdjacentHTML('beforeend', `<a href='/femme/chaussures?type=${value}' class="py-2 px-3 text-white rounded bx-s-2 fs-085 m-2 op-07 hover-bx-s-10 hover-op-1 bg-orange-woman">${key}</a>`)
        st.insertAdjacentHTML('beforeend', `<option value='${value}' class='text-center'>${key}</option>`)
    });
}

// 2
var sp = document.getElementById("sp");
sp.addEventListener("change", () =>{
    var sp_value = sp.value;
    if(sp_value){
        var URL_REDIRECT = URLQueryString.changeURLParameters("prix", sp_value)
    }else{
        var URL_REDIRECT = URLQueryString.deleteParameter("prix")
    }

    window.location.href = URL_REDIRECT; 
})

// 3
st.addEventListener("change", () =>{
    var st_value = st.value;
    if(st_value){
        var URL_REDIRECT = URLQueryString.changeURLParameters("type", st_value)
    }else{
        var URL_REDIRECT = URLQueryString.deleteParameter("type")
    }

    window.location.href = URL_REDIRECT; 
})

// 4
var check_prix_query = URLQueryString.checkParameter("prix");
if(check_prix_query){
    var options = sp.children;
    var selected = document.createAttribute("selected");
    for(let i=0; i<options.length; i++){
        var sp_value = options[i].getAttribute("value");
        if(sp_value == check_prix_query){
            options[i].setAttributeNode(selected);
        }
    }
}

// 5
var check_type_query = URLQueryString.checkParameter("type");
if(check_type_query){
    var options = st.children;
    var selected = document.createAttribute("selected");
    for(let i=0; i<options.length; i++){
        var st_value = options[i].getAttribute("value");
        if(st_value == check_type_query){
            options[i].setAttributeNode(selected);
        }
    }

}


 
