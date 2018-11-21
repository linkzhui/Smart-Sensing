var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
AWS.config.update({
    "accessKeyId": 'AKIAIDH2NTLUAJHPJWAA',
    "secretAccessKey": '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',
    region: 'us-east-2'
});

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var table = "DEVICE_LIST";
// var docClient = new AWS.DynamoDB.DocumentClient();
/* GET home page. */
router.post('/sensor', function(req, res, next) {
    var device_id = req.query.device;
    var smoke = req.query.smoke;
    var longitude = req.query.longitude;
    var latitude = req.query.latitude;
    var params = {
        TableName:table,
        Item:{
            "DEVICE_ID": device_id,
            "smoke": smoke,
            "longitude" : longitude,
            "latitude" : latitude
        }
    };
    console.log("Adding a new item...");
    ddb.putItem({
        'TableName':table,
        'item':params
    }, function(err, data) {
        if (err) {
            res.send("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("successful");
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
    res.send('smoke level: ' + req.query.smoke + ' \n' + 'longitude: ' + req.query.longitude + ' \n' + 'latitude: ' + req.query.latitude);
});

router.get('/sensor', function(req, res, next) {
    res.send('smoke level: ' + req.query.smoke + ' \n' + 'longitude: ' + req.query.longitude + ' \n' + 'latitude: ' + req.query.latitude);
});

module.exports = router;