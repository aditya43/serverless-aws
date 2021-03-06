const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.query({
    TableName: 'adi_notes_app',
    FilterExpression: '#t = :t',
    KeyConditionExpression: '#uid = :uid',
    ExpressionAttributeNames: {
        '#uid': 'user_id',
        '#t': 'title'
    },
    ExpressionAttributeValues: {
        ':uid': 'test3333',
        ':t': 'Test Note 3333'
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
})
;
