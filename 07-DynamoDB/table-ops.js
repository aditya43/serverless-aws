const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const dynamoDB = new AWS.DynamoDB();

dynamoDB.listTables({}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
