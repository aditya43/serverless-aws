const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.batchGet({
    RequestItems: {
        adi_notes_app: {
            Keys: [
                {
                    user_id: 'hjfds832jd',
                    timestamp: 1581905315
                }, {
                    user_id: '1581905315',
                    timestamp: 1581905310
                }
            ]
        },
        adi_new_table: {
            Keys: [
                {
                    user_id: 'test1111',
                    timestamp: 1
                }
            ]
        }
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});
