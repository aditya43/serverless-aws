const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

// We want to perform below PUT operation if and only if user with user_id=test3333 and timestamp=3 does not exists.

docClient.put({
    TableName: 'adi_notes_app',
    Item: {
        user_id: 'test3333',
        timestamp: 3,
        title: 'Test Note 3333',
        content: 'Test Note 3333 Content..'
    },
    ConditionExpression: '#t <> :t and #u <> :u', // #t != :t and #u != :u
    ExpressionAttributeNames: {
        '#u': 'user_id',
        '#t': 'timestamp'
    },
    ExpressionAttributeValues: {
        ':u': 'test3333',
        ':t': 3
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});
