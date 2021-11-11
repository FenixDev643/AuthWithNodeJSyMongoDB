var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('message', { title: 'MongoDB app', Message: '' });
});

module.exports = router;