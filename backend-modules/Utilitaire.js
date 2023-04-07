//Exports modules
const crypto = require("crypto");

class Utilitaire{

    //Creation du code numerique a 6 chiffres
    static getCode(){
        var x = Date.now(),
            y = Math.random();
        if(y == 0){
            var code = x.toString().substring(6, 12);
        }else{
            y = parseInt(y.toString().substring(2));
            var code = (x*y).toString().substring(2, 8);
        }
        return code;
    }

    //creation code reference pour les publications
    static getReference(){
        var x = Date.now();
        var y = Math.random();
        if(y == 0){
            var reference = x.toString().substring(4, 8);
        }else{
            y = parseInt(y.toString().substring(2));
            var reference = (x*y).toString().substring(2, 8);
        }   
        return reference;
    }

    //Hachage des mots de passe utilisateur pour l'inscription
    static getHash(data, algorithm){
        var hash = crypto.createHash(algorithm).update(data).digest("hex");
        return hash;
    }

    //hachage et creation id de session
    static getMd5Hash(password){
        var md5Hash = crypto.createHash("md5").update(password).digest("hex");
        return md5Hash;
    }
    
    //Recuperer la date a l' intance sous n' importe qu' elle format Ex: 20/12/1996, 20_12_1996, 20-12-1996;
    static getDateFormat(separation){
        var date = new Date();
        var j= date.getDate().toString(),
            m= (date.getMonth()+1).toString(),
            a=date.getFullYear().toString();
        if(j.length === 1){
            j="0"+j;
        }if(m.length === 1){
            m="0"+m;
        }
        var la_date= j+separation+m+separation+a;
        return la_date;
    }

    // formatage heure
    static getTime(){
        var date = new Date();
        var heure= date.getHours().toString(); //l'heure
        var minute= date.getMinutes().toString();//a la minute
        if(heure==="0"){
            heure="00";
        }
        if(heure.length===1 && heure!="0"){
            heure="0"+heure;
        }
        if(minute==="0"){
            minute="00";
        }
        if(minute.length===1 && minute!="0"){
            minute = "0"+minute;
        }

        var time = heure+":"+minute;
        return time;
    }

    static prixFormat(prix){
        if(!prix || prix == '0'){
            prix = 0;
        }else{
            prix=prix.toString();
            var taille = prix.length;
    
            if(taille>=1 && taille<=3){
                return prix;
            }else if(taille===4){
                prix=prix[0]+" "+prix.substring(1);
            }else if(taille===5){
                prix =prix.substring(0, 2)+" "+prix.substring(2);
            }else if(taille===6){
                prix=prix.substring(0, 3)+" "+prix.substring(3);
            }else if(taille===7){
                prix=prix[0]+" "+prix.substring(1, 4)+" "+prix.substring(4);
            }else if(taille===8){
                prix=prix.substring(0,2)+" "+prix.substring(2, 5)+" "+prix.substring(5);
            }else if(taille===9){
                prix=prix.substring(0, 3)+" "+prix.substring(3, 6)+" "+prix.substring(6);
            }else if(taille===10){
                prix=prix[0]+" "+prix.substring(1, 4)+" "+prix.substring(4, 7)+" "+prix.substring(7);
            }else if(taille===11){
                prix=prix.substring(0, 2)+" "+prix.substring(2, 5)+" "+prix.substring(5, 8)+" "+prix.substring(8);
            }else if(taille===12){
                prix=prix.substring(0, 3)+" "+prix.substring(3, 6)+" "+prix.substring(6, 9)+" "+prix.substring(9);
            }else{
                prix = 0;
            }    
        }  

        return prix;
    }

}

module.exports = Utilitaire;