var AWS = require('aws-sdk');
// Set the region
AWS.config.update({
    "accessKeyId": 'AKIAIDH2NTLUAJHPJWAA',
    "secretAccessKey": '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',
    region: 'us-east-2'
});

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
    AttributeDefinitions: [
        {
            AttributeName: 'DEVICE_ID',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'DEVICE_ID',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'DEVICE_LIST',
    StreamSpecification: {
        StreamEnabled: false
    }
};

ddb.createTable(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Table Created", data);
    }
});