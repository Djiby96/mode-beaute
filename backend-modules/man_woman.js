/*
    1. Afficher la page de produits :homme, femme et enfant-bebe
*/

const { log } = require("console");
var con = require("./MySQL"),
    pagination = require("./pagination"),
    fs = require("fs");

var ManWoman = {
    // 1
    page : (req, res) =>{
        var genre = req.params.genre,
            categorie = req.params.categorie;

        if((genre != "homme" && genre != "femme") || (categorie != "vetements" && categorie != "chaussures")){
            res.redirect("/");
        }else{
            var R = `SELECT produit.*, categorie, sous_categorie, chemin, nombre_images, REPLACE(FORMAT(prix, 0), ',', ' ') AS 'prix_format', `+
            `REPLACE(titre, ' ', '-') AS 'titre_concat' FROM produit INNER JOIN categorie USING(numero) INNER JOIN images USING(numero) ` +
            `WHERE (genre='${genre}' || genre='homme-femme') AND categorie='${categorie}' AND status='en stock' `

            var RS = `SELECT COUNT(*) FROM produit INNER JOIN categorie USING(numero) WHERE (genre='${genre}' || genre='homme-femme') AND categorie='${categorie}' AND status='en stock' `

    
            if(genre == "homme" && categorie =="vetements"){
                var data = fs.readFileSync("./backend-modules/hv.js", "utf-8")
            }else if(genre == "femme" && categorie =="vetements"){
                var data = fs.readFileSync("./backend-modules/fv.js", "utf-8")
            }else if(genre == "femme" && categorie =="chaussures"){
                var data = fs.readFileSync("./backend-modules/fc.js", "utf-8")
            }else{
                var data = fs.readFileSync("./backend-modules/hc.js", "utf-8") || '[]'
            }

            var products = JSON.parse(data);

            // get query
            var page = parseInt(req.query.page) || 1,
                type = req.query.type,
                prix_order = req.query.prix;
            if(type){
                R = R + `AND type ='${type}' `
                RS = RS + `AND type ='${type}' `

                products.forEach((product, index) =>{
                    if(product.type != type){
                        delete products[index];
                    }
                })
            }
            if(prix_order){
                R = R + `AND prix !=0 `;
                var order_price = `prix ${prix_order}, `
            }else{
                var order_price = ``;
            }    

            // pagination
            var N = 50,
                URL = req._parsedOriginalUrl,
                pagination_link = pagination.createPaginationLink(N, page, URL, 50);
 
            res.render("man_woman.html", {
                genre: genre,
                categorie: categorie,
                products: products,
                pagination_link: pagination_link
            })

            R = R + `ORDER BY ` + order_price + `date DESC LIMIT ${(page - 1)*40}, 40`

            var RF = R + ";" + RS;
            // con.query(RF, (err, rs) =>{
            //     if(err){
            //         res.redirect("/");
            //     }else{
            //         var products = rs[0];

            //         var d = JSON.stringify(products);
            //         fs.writeFileSync("./backend-modules/fc.js", d)
                    
            //         // pagination
            //         var N = rs[1][0]['COUNT(*)'],
            //             URL = req._parsedOriginalUrl,
            //             pagination_link = pagination.createPaginationLink(N, page, URL, 40);
                
            //         //render
            //         res.render("man_woman.html", {
            //             genre: genre,
            //             categorie: categorie,
            //             products: products,
            //             pagination_link: pagination_link
            //         })
            //     }
            // })
        } 
    }
}

module.exports = ManWoman;