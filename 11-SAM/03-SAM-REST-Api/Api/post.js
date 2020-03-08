const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

exports.handler = async event => {
    const userid = event.pathParameters.userid;
    const { firstName, lastName, email, website } = JSON.parse(event.body);

    const item = {
        userid,
        firstName,
        lastName,
        email,
        website
    };

    const data = await documentClient.put({
        TableName: tableName,
        Item: item
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Data inserted/updated successfully',
            data: data
        })
    };
};
