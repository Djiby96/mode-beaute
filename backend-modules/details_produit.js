/*
    1. Afficher details vente
*/
var con = require("./MySQL"),
    fs = require("fs");

var DetailsProduct = {
    // 1
    page : (req, res) =>{
        var genre = req.params.genre,
            categorie = req.params.categorie,
            titre_numero = req.params.titre_numero,
            numero = titre_numero.substring(titre_numero.lastIndexOf("-")+1),
            titre = titre_numero.substring(0, titre_numero.lastIndexOf("-"));

        if((genre !='homme' && genre !='femme' && genre !='homme-femme' && genre !='enfant-bebe') || (categorie != 'vetements' && categorie !='chaussures' && categorie !='accessoires')){
            res.redirect("/");
        }else{
            var R1 = `SELECT produit.*, REPLACE(FORMAT(prix, 0), ',', ' ') AS 'prix_format', chemin, nombre_images, categorie ` + 
            `FROM produit INNER JOIN images USING(numero) INNER JOIN categorie USING(numero) `;

            var R2 = `SELECT produit.*, REPLACE(titre, ' ', '-') AS 'titre_concat', REPLACE(FORMAT(prix, 0), ',', ' ') AS 'prix_format', `+ 
            `chemin, nombre_images, categorie FROM produit INNER JOIN images USING(numero) INNER JOIN categorie USING(numero) `+
            `WHERE numero !=? AND status='en stock' AND categorie='${categorie}' `



            var data = fs.readFileSync("./backend-modules/dp.js", "utf-8") || '[]';
            var p = JSON.parse(data);

            var product = [];
            p.forEach((list) =>{
                if(list.numero == numero){
                    product.push(list);
                }
            })

            // if(genre =='homme' || genre =='femme'){
            //     R2 = R2 + `AND (genre='${genre}' || genre='homme-femme') `
            // }else{
            //     R2 = R2 + `AND genre='${genre}' `
            // }

            var products_sim = [];
            if(genre =="enfant-bebe" || genre =="homme-femme"){
                p.forEach((product) =>{
                    if(product.genre == genre && product.categorie == categorie){
                        products_sim.push(product)
                    }
                })
            }else{
                p.forEach((product) =>{
                    if((product.genre == genre || product.genre =='homme-femme') && product.categorie == categorie){
                        products_sim.push(product)
                    }
                })
            }

            if(product.length != 1){
                res.redirect("/");
            }else{
                res.render("details_produit.html", {
                    genre: genre,
                    categorie: categorie,
                    titre_numero: titre_numero,
                    numero: numero,
                    product: product[0],
                    products_sim: products_sim.slice(0, 10)
                })
            }    

            R2 = R2 + `AND MATCH(titre) AGAINST(?) ORDER BY date DESC LIMIT 0, 10`;
             
            var RF = R1 + ";" + R2;
            // con.query(RF, [numero, numero, titre], (err, rs) =>{
            //     if(err){
            //         res.redirect("/");
            //     }else{
            //         var products = rs[0],
            //             products_sim = rs[1];   

            //         // var d = JSON.stringify(products);
            //         // fs.writeFileSync("./backend-modules/dp.js", d)    

                    

            //         // if(product.length != 1){
            //         //     res.redirect("/");
            //         // }else{
            //         //     res.render("details_produit.html", {
            //         //         genre: genre,
            //         //         categorie: categorie,
            //         //         titre_numero: titre_numero,
            //         //         numero: numero,
            //         //         product: product[0],
            //         //         products_sim: products_sim
            //         //     })
            //         // }    
            //     }
            // })

        }
    }
}

module.exports = DetailsProduct;