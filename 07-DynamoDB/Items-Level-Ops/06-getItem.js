const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.get({
    TableName: 'adi_notes_app',
    Key: {
        user_id: 'test3333',
        timestamp: 3
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});
