var express = require('express');
var passport = require('passport');
var router = express.Router();
var API = require('../database/DB');
var DB = new API();

router.get('/', function(req, res, next) {
  res.render('checkUser', { title: 'Log in MongoDB' });
});

router.post('/', passport.authenticate('local', { failureRedirect: '/', successRedirect: '/Home', failureFlash: true }));

module.exports = router;
