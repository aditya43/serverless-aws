/**
 * Route: GET /note/n/{note_id}
 */

const AWS = require('aws-sdk');
const _ = require('underscore');
const helpers = require('../utils/helpers');

AWS.config.update({ region: 'ap-south-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.NOTES_TABLE;

exports.handler = async event => {
    try {
        const noteId = decodeURIComponent(event.pathParameters.note_id);

        const params = {
            TableName,
            IndexName: 'note_id-index',
            KeyConditionExpression: 'note_id = :note_id',
            ExpressionAttributeValues: {
                ':note_id': noteId
            },
            Limit: 1
        };

        const data = await dynamoDB.query(params).promise();

        if (!_.isEmpty(data.Items)) {
            return {
                statusCode: 200,
                headers: helpers.getResponseHeaders(),
                body: JSON.stringify(data.Items[0], null, 2)
            };
        }

        return {
            statusCode: 404,
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
