const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

exports.handler = async event => {
    const userid = event.pathParameters.userid;

    const data = await documentClient.get({
        TableName: tableName,
        Key: {
            userid
        }
    }).promise();

    if (data.Item) {
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };
    } else {
        throw new Error('User not found');
    }
};
