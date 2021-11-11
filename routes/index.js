var express = require('express');
var router = express.Router();
var API = require('../database/DB');
var DB = new API();

/* GET home page. */
router.get('/', function(req, res, next) {
  DB.getUsers(function(err,users){
    if(err){
      res.render('message', { title: 'Insert User MongoDB', Message: err });
    }
    else{
      if(users){
        res.render('index', { title: 'MongoDB app', Users: users });
      }
    }
  });
});

module.exports = router;