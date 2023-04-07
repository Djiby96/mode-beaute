/*
    1. page ajout produit

    2. POST : ajout de produit
*/

var Files = require("./Files.js"),
    con = require("./MySQL.js");

var AddProduct = {
    // 1
    page : (req, res) =>{
        var cc = req.signedCookies.cc;
        if(!cc){
            res.redirect("/connexion-admin")
        }else{
            res.render("ajouter_produit.html");
        }
    },

    adding: (req, res) =>{
        var cc = req.signedCookies.cc;
        if(!cc){
            res.redirect("/connexion-admin")
        }else{
            var b = req.body,
                files = req.files;

            //download files
            var img_data_table = Files.upload(files, "./images/product/");
            
            // table produit
            var Tp = [img_data_table[2], b.titre, b.prix, b.genre, b.type || '', b.description];
            var Rp = `INSERT INTO produit(numero, titre, prix, genre, type, description) VALUES (?)`;

            // table images
            var Ti = img_data_table;
            var Ri = `INSERT INTO images VALUES (?)`

            // table categorie
            var Tc = [b.categorie, "", img_data_table[2]]
            var Rc = `INSERT INTO categorie VALUES (?)`
            if(b.genre == 'enfant-bebe'){
                Tc[1] = b.sous_categorie; 
            }

            var D = [Tp, Ti, Tc];
            var R = "START TRANSACTION;" + Rp + ";" + Ri + ";" + Rc + ";COMMIT";
            con.query(R, D, (err, rs) =>{
                if(err){
                    console.log(err);
                    res.redirect("/espace-admin/ajouter-produit");
                }else{
                    req.flash("message", "success/Vente ajoutée avec succès.")
                    res.redirect("/espace-admin/ajouter-produit");
                }
            })
        }
    }
}

module.exports = AddProduct;