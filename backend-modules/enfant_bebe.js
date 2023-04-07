/*
    1. Afficher la page pour les enfants et bebe
*/
var con = require("./MySQL"),
    pagination = require("./pagination"),
    fs = require("fs");

var ChildBaby = {
    // 1
    page : (req, res) =>{
        var R = `SELECT produit.*, categorie, sous_categorie, chemin, nombre_images, REPLACE(FORMAT(prix, 0), ',', ' ') AS 'prix_format', `+
        `REPLACE(titre, ' ', '-') AS 'titre_concat' FROM produit INNER JOIN categorie USING(numero) INNER JOIN images USING(numero) ` +
        `WHERE genre='enfant-bebe' AND status='en stock' `

        var RS = `SELECT COUNT(*) FROM produit INNER JOIN categorie USING(numero) WHERE genre='enfant-bebe' AND status='en stock' `

        
        var data = fs.readFileSync("./backend-modules/eb.js", "utf-8") || '[]';
        
        var p = JSON.parse(data);

        // get query
        var page = parseInt(req.query.page) || 1,
            categorie = req.query.categorie,
            sexe = req.query.sexe,
            prix_order = req.query.prix;

        if(categorie){
            R = R + `AND categorie='${categorie}' `
            RS = RS + `AND categorie='${categorie}' `

            p.forEach((product, index) =>{
                if(product.categorie != categorie){
                    delete p[index];
                }
            })
        }    
        if(sexe){
            R = R + `AND sous_categorie='${sexe}' `
            RS = RS + `AND sous_categorie='${sexe}' `  
            
            p.forEach((product, index) =>{
                if(product.sous_categorie != sexe){
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

        // pagination
        var N = 50,
        URL = req._parsedOriginalUrl,
        pagination_link = pagination.createPaginationLink(N, page, URL, 50);
        res.render("enfant_bebe.html", {
            products: p,
            pagination_link: pagination_link
        })


        R = R + `ORDER BY ` + order_price + `date DESC LIMIT ${(page - 1)*40}, 40`
        
        var RF = R + ";" + RS;
        // con.query(RF, (err, rs) =>{
        //     if(err){
        //         res.redirect("/")
        //     }else{
        //         var products = rs[0];

        //         // var d = JSON.stringify(products);
        //         // fs.writeFileSync("./backend-modules/eb.js", d)

        //         // pagination
        //         var N = rs[1][0]['COUNT(*)'],
        //                 URL = req._parsedOriginalUrl,
        //                 pagination_link = pagination.createPaginationLink(N, page, URL, 40);

        //         res.render("enfant_bebe.html", {
        //             products: products,
        //             pagination_link: pagination_link
        //         })
        //     }
        // })
    }
}

module.exports = ChildBaby;