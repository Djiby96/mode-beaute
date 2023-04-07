/*
    1. Afficher la page accessoires
*/

var con = require("./MySQL"),
    pagination = require("./pagination"),
    fs = require("fs");

var Accessory = {
    // 1
    page : (req, res) =>{
        var R = `SELECT produit.*, categorie, sous_categorie, chemin, nombre_images, REPLACE(FORMAT(prix, 0), ',', ' ') AS 'prix_format', `+
        `REPLACE(titre, ' ', '-') AS 'titre_concat' FROM produit INNER JOIN categorie USING(numero) INNER JOIN images USING(numero) ` +
        `WHERE categorie='accessoires' AND status='en stock' `

        var RS = `SELECT COUNT(*) FROM produit INNER JOIN categorie USING(numero) WHERE categorie='accessoires' AND status='en stock' `

        var data = fs.readFileSync("./backend-modules/ac.js", "utf-8") || '[]';
        
        var p = JSON.parse(data);

        // get query
        var page = parseInt(req.query.page) || 1,
            genre = req.query.genre,
            type = req.query.type,
            prix_order = req.query.prix;
        
        if(genre){
            // if(genre == 'homme' || genre == 'femme'){
            //     R = R + `AND (genre='${genre}' || genre='homme-femme') `
            //     RS = RS + `AND (genre='${genre}' || genre='homme-femme') `
            // }else{
            //     R = R + `AND genre='${genre}' `
            //     RS = RS + `AND genre='${genre}' `
            // }

            if(genre =="enfant-bebe" || genre =="homme-femme"){
                p.forEach((product, index) =>{
                    if(product.genre != genre){
                        delete p[index];
                    }
                })
            }else{
                p.forEach((product, index) =>{
                    if(product.genre != genre && product.genre !='homme-femme'){
                        delete p[index];
                    }
                })
            }
        }
        
        if(type){
            R = R + `AND type='${type}' `
            RS = RS + `AND type='${type}' `

            p.forEach((product, index) =>{
                if(product.type != type){
                    delete p[index];
                }
            })
        }
        if(prix_order){
            R = R + `AND prix !=0 `
            var order_price = `prix ${prix_order}, `
        }else{
            var order_price = ``;
        }

        var N = 50,
        URL = req._parsedOriginalUrl,
        pagination_link = pagination.createPaginationLink(N, page, URL, 50);

        res.render("accessoires.html", {
            products: p,
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
        //         fs.writeFileSync("./backend-modules/ac.js", d)

        //         // pagination
        //         var N = rs[1][0]['COUNT(*)'],
        //                 URL = req._parsedOriginalUrl,
        //                 pagination_link = pagination.createPaginationLink(N, page, URL, 40);

        //         res.render("accessoires.html", {
        //             products: products,
        //             pagination_link: pagination_link
        //         })        
        //     }
        // })
    }
}

module.exports = Accessory;