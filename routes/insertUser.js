var express = require('express');
var router = express.Router();
var API = require('../database/DB');
var DB = new API();
var bcrypt = require('bcrypt')

router.get('/', function(req, res, next) {
  res.render('insertUser', { title: 'Register User MongoDB' });
});

router.post('/', function(req, res){
  console.log("user posted");
    var nombre = req.body.nombre;
    var email = req.body.email;
    var contraseña = req.body.contraseña;
    var Confirmcontraseña = req.body.Confirmcontraseña;
    if(contraseña != Confirmcontraseña){
      res.render('message', { title: 'Insert User MongoDB', Message: 'la contraseña debe ser igual al confirmar' });
    }
  bcrypt.hash(contraseña, 9).then(function(HashedPassword){
    var newUser = {
      nombre: nombre,
      email: email,
      contraseña: HashedPassword
    }
    DB.insertUser(newUser,function(err,result){
      if(err){
        res.render('message', { title: 'Insert User MongoDB', Message: err });
      }
      else{
        if(result){
          res.render('message', { title: 'Insert User MongoDB', Message: result });
        }
        else{
          res.render('message', { title: 'Insert User MongoDB', Message: 'hubo un problema desconocido' });
        }
      }
    });
  })
});

module.exports = router;
