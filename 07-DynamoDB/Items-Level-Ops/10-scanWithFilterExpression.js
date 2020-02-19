const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.scan({
    TableName: 'adi_notes_app',
    FilterExpression: 'cat = :cat',
    ExpressionAttributeValues: {
        ':cat': 'home'
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});
