// NODE and NPM MODULES
var express = require("express"),
    path = require("path"),
    ejs = require("ejs"),
    bodyParser = require('body-parser'),
    cookieParser = require("cookie-parser"),
    multer = require("multer"),
    cookieSession = require("cookie-session"),
    connectFlash = require("connect-flash");

// Init module
var multerOption = multer();
var app = express();
 
// Init app to render html file
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Init app to use body-parser, cookie-parser and flash
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("vetements_chaussures_accessoires"));
app.use(cookieSession({name: "vetements-chaussures-accessoires", keys: ["vetements_chaussures_accessoires"]}));
app.use(connectFlash());

// Init app to use static-folder
app.use(express.static(path.join(__dirname , "css")))
app.use(express.static(path.join(__dirname , "views")))
app.use(express.static(path.join(__dirname , "images")))
app.use(express.static(path.join(__dirname , "js")))
app.use(express.static(__dirname)) 

// Init app port
var port = 55555;
app.listen(port)

// Export backend-modules for app
var Accueil = require("./backend-modules/accueil.js"),
    AdminConnect = require("./backend-modules/connexion_admin.js"),
    ManWoman = require("./backend-modules/man_woman.js"),
    flashMessage = require("./backend-modules/flashMessage.js"),
    Accessory = require("./backend-modules/accessoires.js"),
    ChildBaby = require("./backend-modules/enfant_bebe.js"),
    AddProduct = require("./backend-modules/ajouter_produit.js"),
    DetailsProduct = require("./backend-modules/details_produit.js"),
    Produits = require('./backend-modules/produits.js');




//use message flash
app.use(flashMessage.message) 

// get method from client
app.get("/", Accueil.page_accueil)

app.get("/accessoires", Accessory.page)

app.get("/enfant-bebe", ChildBaby.page)

app.get("/connexion-admin", AdminConnect.page_connexion_admin)

app.get("/espace-admin/ajouter-produit",  AddProduct.page)

app.get("/espace-admin/produits",  Produits.page_produits)

app.get("/espace-admin/produits/disable-produit-:numero",  Produits.disable_product)

app.get("/:genre/:categorie", ManWoman.page)

app.get("/:genre/:categorie/:titre_numero", DetailsProduct.page)


// post method
app.post("/connexion-admin", AdminConnect.admin_connexion_verify)

app.post("/espace-admin/ajouter-produit", multerOption.any(), AddProduct.adding)
