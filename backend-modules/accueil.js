/*
    1. Afficher la page d'accueil
*/

var con = require("./MySQL"),
    fs = require("fs");

var Accueil = {
    // 1
    page_accueil : (req, res) =>{
        var R_HOMME = `SELECT produit.*, categorie, sous_categorie, chemin, nombre_images, REPLACE(FORMAT(prix, 0), ',', ' ') AS 'prix_format', `+
        `REPLACE(titre, ' ', '-') AS 'titre_concat' FROM produit INNER JOIN categorie USING(numero) INNER JOIN images USING(numero) ` +
        `WHERE genre='homme' AND status='en stock' AND categorie='vetements' ORDER BY date DESC LIMIT 0,10`

        var R_FEMME = `SELECT produit.*, categorie, sous_categorie, chemin, nombre_images, REPLACE(FORMAT(prix, 0), ',', ' ') AS 'prix_format', `+
        `REPLACE(titre, ' ', '-') AS 'titre_concat' FROM produit INNER JOIN categorie USING(numero) INNER JOIN images USING(numero) ` +
        `WHERE genre='femme' AND status='en stock' AND categorie='vetements' ORDER BY date DESC LIMIT 0,10`

        var RF = R_HOMME + ";" + R_FEMME;
        // con.query(RF, (err, rs) =>{
        //     if(err){
        //         var products_h = [],
        //             products_f = [];
        //     }else{
        //         var products_h = rs[0],
        //             products_f = rs[1];
        //     }
        //     res.render("accueil.html", {
        //         products_h: products_h,
        //         products_f: products_f
        //     })
        // })

        var data_h = fs.readFileSync("./backend-modules/products_h.js", "utf-8")
        var data_f = fs.readFileSync("./backend-modules/products_f.js", "utf-8")

        var products_h = JSON.parse(data_h) || [];
        var products_f = JSON.parse(data_f) || [];

        res.render("accueil.html", {
            products_h: products_h,
            products_f: products_f
        });
        
    }
}

module.exports = Accueil;