/**
 * Route: PATCH /note
 */

const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const moment = require('moment');
const helpers = require('../utils/helpers');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.NOTES_TABLE;

exports.handler = async event => {
    try {
        const Item = JSON.parse(even.body).Item;

        Item.user_id = helpers.getUserId(event.headers);
        Item.user_name = helpers.getUserName(event.headers);
        Item.expires = moment().add(90, 'days')
            .unix();

        const data = await dynamoDB.put({
            TableName,
            Item,
            ConditionExpression: '#t = :t',
            ExpressionAttributeNames: {
                '#t': 'timestamp'
            },
            ExpressionAttributeValues: {
                ':t': Item.timestamp
            }
        }).promise();

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
