var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/AuthMongoDB');
console.log("connected to data base");
// usa Schema para crear colecciones
var Schema = mongoose.Schema;
var documentDescription = {
nombre: String,
apellidos: String,
telefono: String
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
    NewUsuario.apellidos = NuevaData.apellidos;
    NewUsuario.telefono = NuevaData.telefono;

    // lo guarda y detecta si hay un error
    NewUsuario.save(function(err){
        if(err){
            return callBack("error al insertar usuario " + err)
        }
        else{
            return callBack(null,"usuario insertado correctamente")
        }
        })
}

DB.prototype.getUsers = function(callBack){
    UserData.find({},function(err,docs){
        if(err){
            callBack("error al conseguir usuarios " + err,null);
        }
        else{
            callBack(null,docs);
        }
    })
}

var something = function(){
    console.log("HELLO WORLD");
}

module.exports = DB;