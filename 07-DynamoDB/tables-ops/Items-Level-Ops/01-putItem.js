const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.put({
    TableName: 'adi_notes_app',
    Item: {
        user_id: 'test123',
        timestamp: 1,
        title: 'Test Note',
        content: 'Test Note Content..'
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});
