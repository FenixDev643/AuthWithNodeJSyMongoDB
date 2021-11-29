var express = require('express');
var router = express.Router();
var API = require('../database/DB');
var DB = new API();

router.get('/', function(req, res, next) {
   if(req.isAuthenticated()) return next();
   res.redirect("/login");
},function(req,res){
   var User = {
        nombre: req.user.nombre,
        email: req.user.email,
        contraseña: req.user.contraseña
   }
   res.render('Home', { title: 'Home MongoDB', User: User });
});

module.exports = router;
