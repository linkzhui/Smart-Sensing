var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var appRoot = require('app-root-path');
var serviceAccount = require(appRoot+'/smart-sensing-d8461-firebase-adminsdk-1smbs-1ca4f83dba.json');
// As an admin, the app has access to read and write all data, regardless of Security Rules
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://smart-sensing-d8461.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

/* GET home page. */
router.post('/sensor', function(req, res, next) {
    var deviceRef = ref.child("device");
    deviceRef.child("device_1").update({
        smoke_level: req.query.smoke,
        longitude: req.query.longitude,
        latitude: req.query.latitude
    });
    res.send('smoke level: ' + req.query.smoke + ' \n' + 'longitude: ' + req.query.longitude + ' \n' + 'latitude: ' + req.query.latitude);
});

router.get('/sensor', function(req, res, next) {
    res.send('smoke level: ' + req.query.smoke + ' \n' + 'longitude: ' + req.query.longitude + ' \n' + 'latitude: ' + req.query.latitude);
});

module.exports = router;