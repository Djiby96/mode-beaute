/*
    1. Configuer les messages flash
*/

var flashMessage = {
    // 1
    message: (req, res, next)=>{
        res.locals.message = req.flash("message");
        next();
    },

}

module.exports = flashMessage;