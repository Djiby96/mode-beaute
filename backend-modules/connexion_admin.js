/*
    1. Afficher la page de connexion admin

    2. Verifier la connexion admin 
*/

var con = require("./MySQL.js");

var AdminConnect = {
    // 1
    page_connexion_admin : (req, res) =>{
        res.render("./connexion_admin.html");
    },

    // 2
    admin_connexion_verify : (req, res) =>{
        var body = req.body;
        var mdp = body.mdp;
        
        var R = "SELECT *FROM admin where mdp=?";
        con.query(R, [mdp], (err, rs) =>{
            if(err){
                res.redirect("/connexion-admin")
            }else{
                if(rs.length != 1){
                    res.redirect("/connexion-admin")
                }else{
                    var cc = "CHDYEJSHHYEZWWKDJSMHDGPONXGSSFIONS",
                        proprio = "LB437-YCDSA-EUNF-0HCS-VDCG-NDFH-JJGE";

                    res.cookie("cc", cc, {signed: true, secure:false, httpOnly:true, path:"/espace-admin", sameSite:'Strict', maxAge:1000*60*60*24*30*12*10});
                    res.cookie("proprio", proprio, {signed: true, secure:false, httpOnly:false, path:"/", sameSite:'Strict', maxAge:1000*60*60*24*30*12*10});
                    res.redirect("/espace-admin/produits");
                }
            }
        })
    }

}

module.exports = AdminConnect;