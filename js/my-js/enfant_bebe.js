/*

  1. Changer l'URL si la categorie est selectionnee

  2. Changer l'URL si le sexe est selectionnee

  3. Changer l'URL si le prix est selectionnee

  4. Selectionner la categorie correspondant au chargement de la page

  5. Selectionner le sexe au chargement de la page

  6. Selectionner le prix au chargement de la page

*/

// 1
const sc = document.getElementById("sc");
sc.addEventListener("change", () =>{
    var value = sc.value;
    if(value){
        var URL_REDIRECT = URLQueryString.changeURLParameters("categorie", value)
    }else{
        var URL_REDIRECT = URLQueryString.deleteParameter("categorie")
    }

    window.location.href = URL_REDIRECT; 
})

// 2
const ss = document.getElementById("ss");
ss.addEventListener("change", () =>{
    var value = ss.value;
    if(value){
        var URL_REDIRECT = URLQueryString.changeURLParameters("sexe", value)
    }else{
        var URL_REDIRECT = URLQueryString.deleteParameter("sexe")
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
var check_categorie_query = URLQueryString.checkParameter("categorie");
if(check_categorie_query){
    var options = sc.children;
    var selected = document.createAttribute("selected");
    for(let i=0; i<options.length; i++){
        var sc_value = options[i].getAttribute("value");
        if(sc_value == check_categorie_query){
            options[i].setAttributeNode(selected);
        }
    }
}

// 5
var check_sexe_query = URLQueryString.checkParameter("sexe");
if(check_sexe_query){
    var options = ss.children;
    var selected = document.createAttribute("selected");
    for(let i=0; i<options.length; i++){
        var value = options[i].getAttribute("value");
        if(value == check_sexe_query){
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