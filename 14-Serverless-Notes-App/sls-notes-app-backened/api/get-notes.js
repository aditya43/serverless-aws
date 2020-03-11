/**
 * Route: GET /notes
 */

const AWS = require('aws-sdk');
const helpers = require('../utils/helpers');

AWS.config.update({ region: 'ap-south-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.NOTES_TABLE;

exports.handler = async event => {
    try {
        const limit = event.queryStringParameters.limit || 5;
        const startTimeStamp = event.queryStringParameters.start || 0;
        const userId = helpers.getUserId(event.headers);

        const params = {
            TableName,
            KeyConditionExpression: 'user_id = :uid',
            ExpressionAttributeValues: {
                ':uid': userId
            },
            Limit: parseInt(limit),
            ScanIndexForward: false // This will return data in descending order of sort key. The sort key in our case is timestamp.
        };

        if (parseInt(startTimeStamp) > 0) {
            params.ExclusiveStartKey = {
                user_id: userId,
                timestamp: startTimeStamp
            };
        }

        const data = await dynamoDB.query(params).promise();

        return {
            statusCode: 200,
            headers: helpers.getResponseHeaders(),
            body: JSON.stringify(data, null, 2)
        };
    } catch (err) {
        console.log(err);

        return {
            statusCode: err.statusCode || 500,
            headers: helpers.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name || 'Internal Server Error',
                message: err.message || 'Something went wrong!'
            }, null, 2)
        };
    }
};
