/**
 * Route: DELETE /note/t/{timestamp}
 */

const AWS = require('aws-sdk');
const helpers = require('../utils/helpers');

AWS.config.update({ region: 'ap-south-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.NOTES_TABLE;

exports.handler = async event => {
    try {
        const timestamp = parseInt(event.pathParameters.timestamp);

        const params = {
            TableName,
            Key: {
                user_id: helpers.getUserId(event.headers),
                timestamp
            }
        };

        await dynamoDB.delete(params).promise();

        return {
            statusCode: 200,
            headers: helpers.getResponseHeaders()
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
