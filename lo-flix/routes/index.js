var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home.ejs');
});

router.get('/test', function(req, res, next) {
  res.render('test.ejs');
});

module.exports = router;
