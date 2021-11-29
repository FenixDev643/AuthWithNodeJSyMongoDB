var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var StrategyLogin = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost/AuthMongoDB');
console.log("connected to data base");
// usa Schema para crear colecciones
var Schema = mongoose.Schema;
var documentDescription = {
nombre: String,
email: String,
contraseña: String
}

// se crea la nueva coleccion
var userData = new Schema(documentDescription);

// se crea un nuevo modelo llamado "UsuarioData"
// en la base de datos "Base de Datos"
var UserData = mongoose.model('Users',userData);

//MongoDB
var DB = function(){
    //inicia una connecion
}

DB.prototype.insertUser = function(NuevaData,callBack){
    // se crea una instancia de UserData
    // para que le agregemos parametros como
    // el nombre apellido etc...
    var NewUsuario = new UserData();
    NewUsuario.nombre = NuevaData.nombre;
    NewUsuario.email = NuevaData.email;
    NewUsuario.contraseña = NuevaData.contraseña;

    // lo guarda y detecta si hay un error
    NewUsuario.save(function(err){
        if(err){
            return callBack("error al insertar usuario " + err)
        }
        else{
            return callBack(null,"usuario registrado correctamente")
        }
        })
}

DB.prototype.serializeUser = function(user, callBack){
  callBack(null,user.nombre);
}

DB.prototype.deserializeUser = function(username, callBack){

  UserData.find({nombre: username},function(err,docs){
       callBack(err,docs[0]); 
    })
}

DB.prototype.getUsers = function(callBack){
    UserData.find({},function(err,docs){
        if(err){
            callBack("error al conseguir usuarios: " + err,null);
        }
        else{
            callBack(null,docs);
        }
    })
}

DB.prototype.Strategy = new StrategyLogin(
function checkUserFunction(username, password,callback){

  UserData.find({username, password},function(err,docs){
        if(err){
            return callback(err,false);
        }
          if(!docs[0]){
            return callback(null,false, { message: 'no se encontro un usuario' });
          }
            bcrypt.compare(password,docs[0].contraseña).then(function(samePassword){
              if(!samePassword){
                return callback(null, false, 'contraseña incorrecta');
              }
              var completedUser = docs[0];
              completedUser.contraseña = password;
              return callback(null,completedUser);
            })
    })

}
);

module.exports = DB;
