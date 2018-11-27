var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
AWS.config.update({
    "accessKeyId": 'AKIAIDH2NTLUAJHPJWAA',
    "secretAccessKey": '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',
    region: 'us-east-2'
});

// Create DynamoDB service object
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "DEVICE_LIST";
// var docClient = new AWS.DynamoDB.DocumentClient();
/* GET home page. */
router.post('/sensor', function(req, res, next) {
    var id = req.query.id;
    var smoke = req.query.smoke;
    var longitude = req.query.longitude;
    var latitude = req.query.latitude;
    var item = {
            "id": {'S':id},
            "smoke": {'S':smoke},
            "longitude" : {'S':longitude},
            "latitude" : {'S':latitude}
    };
    console.log("Adding a new item...");
    docClient.update({
        'TableName':table,
        Key:{
            "id": {'S':id},
        },
        UpdateExpression: "set smoke = :r, longitude=:p, latitude=:a",
        ExpressionAttributeValues:{
            ":r":smoke,
            ":p":longitude,
            ":a":latitude
        },
        ReturnValues:"UPDATED_NEW"
    }, function(err, data) {
        if (err) {
            res.send("Unable to add item. Error JSON:"+ JSON.stringify(err, null, 2));
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("successful");
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
    //res.send('smoke level: ' + req.query.smoke + ' \n' + 'longitude: ' + req.query.longitude + ' \n' + 'latitude: ' + req.query.latitude);
});

router.get('/sensor', function(req, res, next) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.get({
        TableName: table,
        Key:{
            "id": "1"
        }
    }, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.json(data.Item);
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });

});

module.exports = router;