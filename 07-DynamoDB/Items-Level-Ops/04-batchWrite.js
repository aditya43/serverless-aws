const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.batchWrite({
    RequestItems: {
        adi_notes_app: [
            {
                DeleteRequest: {
                    Key: {
                        user_id: 'test123',
                        timestamp: 1
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        user_id: 'test2222',
                        timestamp: 2,
                        title: 'Test Note 2222',
                        content: 'Test Note 2222 Content..'
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        user_id: 'test3333',
                        timestamp: 3,
                        title: 'Test Note 3333',
                        content: 'Test Note 3333 Content..'
                    }
                }
            }
        ]
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});
