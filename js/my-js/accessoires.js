/*

  1. Changer l'URL si le genre est selectionnee

  2. Changer l'URL si le type est selectionnee

  3. Changer l'URL si le prix est selectionnee

  4. Selectionner le genre correspondant au chargement de la page

  5. Selectionner le type au chargement de la page

  6. Selectionner le prix au chargement de la page

*/

// 1
const sg = document.getElementById("sg");
sg.addEventListener("change", () =>{
    var sg_value = sg.value;
    if(sg_value){
        var URL_REDIRECT = URLQueryString.changeURLParameters("genre", sg_value)
    }else{
        var URL_REDIRECT = URLQueryString.deleteParameter("genre")
    }

    window.location.href = URL_REDIRECT; 
})

// 2
const st = document.getElementById("st");
st.addEventListener("change", () =>{
    var st_value = st.value;
    if(st_value){
        var URL_REDIRECT = URLQueryString.changeURLParameters("type", st_value)
    }else{
        var URL_REDIRECT = URLQueryString.deleteParameter("type")
    }

    window.location.href = URL_REDIRECT; 
})

// 3
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


// 4
var check_genre_query = URLQueryString.checkParameter("genre");
if(check_genre_query){
    var options = sg.children;
    var selected = document.createAttribute("selected");
    for(let i=0; i<options.length; i++){
        var sg_value = options[i].getAttribute("value");
        if(sg_value == check_genre_query){
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

// 6
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