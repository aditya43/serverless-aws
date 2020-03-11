/**
 * Route: POST /note
 */

const AWS = require('aws-sdk');

const moment = require('moment');
const uuidv5 = require('uuid/v5');
const helpers = require('../utils/helpers');

AWS.config.update({ region: 'ap-south-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.NOTES_TABLE;

exports.handler = async event => {
    try {
        const Item = JSON.parse(even.body).Item;

        Item.user_id = helpers.getUserId(event.headers);
        Item.user_name = helpers.getUserName(event.headers);
        Item.note_id = `${Item.user_id}:${uuidv5()}`;
        Item.timestamp = moment().unix();
        Item.expires = moment().add(90, 'days')
            .unix();

        await dynamoDB.put({ TableName, Item }).promise();

        return {
            statusCode: 200,
            headers: helpers.getResponseHeaders(),
            body: JSON.stringify(Item, null, 2)
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
