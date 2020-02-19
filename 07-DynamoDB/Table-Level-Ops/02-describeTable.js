const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const dynamoDB = new AWS.DynamoDB();

dynamoDB.describeTable({
    TableName: 'adi_notes_app'
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});
