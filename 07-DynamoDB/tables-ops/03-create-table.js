const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const dynamoDB = new AWS.DynamoDB();

dynamoDB.createTable({
    TableName: 'adi_new_table',
    AttributeDefinitions: [
        {
            AttributeName: 'user_id',
            AttributeType: 'S'
        },
        {
            AttributeName: 'timestamp',
            AttributeType: 'N'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'user_id',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'timestamp',
            KeyType: 'RANGE'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});
