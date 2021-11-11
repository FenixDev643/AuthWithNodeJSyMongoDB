var express = require('express');
var router = express.Router();
var API = require('../database/DB');
var DB = new API();

router.get('/', function(req, res, next) {
  res.render('insertUser', { title: 'Insert User MongoDB' });
});

router.post('/', function(req, res){
  console.log("user posted");
    var nombre = req.body.nombre;
    var apellidos = req.body.apellidos;
    var telefono = req.body.telefono;
    var newUser = {
      nombre: nombre,
      apellidos: apellidos,
      telefono: telefono
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
 });

module.exports = router;