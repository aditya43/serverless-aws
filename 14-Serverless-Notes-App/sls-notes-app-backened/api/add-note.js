/**
 * Route: POST /note
 */

const AWS = require('aws-sdk');
const helpers = require('../utils/helpers');

AWS.config.update({ region: 'ap-south-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async event => {
    try {
        return {
            statusCode: 200,
            headers: helpers.getResponseHeaders(),
            body: JSON.stringify('')
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
