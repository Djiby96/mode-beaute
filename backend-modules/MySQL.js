/*
    1. CE FICHIER VA CONTENIR L'OBJET DE CONNEXION MYSQL
*/

var mysql = require('mysql');

var con = mysql.createPool({
    connectionLimit: 9000,
    host: "localhost",
    user: "Djiby",
    password: "Djiby_Sarr_1996",
    database:"mode_beaute",
    multipleStatements:true
});


module.exports = con;