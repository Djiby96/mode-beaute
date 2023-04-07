/*
   1. Telecharger les photos
*/

var fs = require("fs"),
    Utilitaire = require("./Utilitaire.js");

class Files{

    // 1
    static upload(files, destination){
        var date_file = Utilitaire.getDateFormat("_"),
            numero = Utilitaire.getReference();

        var nombre_images=0;
        for(let i = 0; i<files.length;i++){
            var file_upload_src = destination + date_file + "_" + numero + "_" + (i+1) + ".jpg";
            try{
                fs.createWriteStream(file_upload_src).write(files[i].buffer);
                nombre_images++;
            }catch(error){
                return null
            }
        } 
        
        var chemin = "/product/" + date_file + "_" + numero + "_" + 1 + ".jpg";
        var img_data_table = [chemin, nombre_images, numero];

        return img_data_table;
    }

}

module.exports = Files;