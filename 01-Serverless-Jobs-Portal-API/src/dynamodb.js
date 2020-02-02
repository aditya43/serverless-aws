const AWS = require('aws-sdk');

console.log('IS_OFFLINE: ', process.env.IS_OFFLINE);

const options = {};

if (process.env.IS_OFFLINE) {
    options.region = 'localhost';
    options.endpoint = 'http://localhost:8082';
}
exports.dynamodb = new AWS.DynamoDB.DocumentClient(options);
