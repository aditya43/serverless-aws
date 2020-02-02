const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8082'
});

module.exports.handler = async (event, context) => {
    const job = JSON.parse(event.body);
    const timeStamp = new Date().getTime();

    const params = {
        TableName: 'jobs-portal',
        Item: {
            id: uuid.v1(),
            title: job.title,
            published: job.published,
            createdAt: timeStamp,
            updatedAt: timeStamp
        }
    };

    try {
        await dynamodb.put(params).promise();

        return {
            statusCode: 201,
            body: JSON.stringify(params.Item)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
};
