var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/sensor', function(req, res, next) {
    res.send('smoke level: ' + req.query.smoke + ' \n' + 'longitude: ' + req.query.longitude + ' \n' + 'latitude: ' + req.query.latitude);
});

module.exports = router;