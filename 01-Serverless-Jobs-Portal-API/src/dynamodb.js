const AWS = require('aws-sdk');

exports.dynamodb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8082'
});
