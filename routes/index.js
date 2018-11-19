var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    hostname: 'http://linksmartsensing.us-east-2.elasticbeanstalk.com'
  });
});

module.exports = router;
