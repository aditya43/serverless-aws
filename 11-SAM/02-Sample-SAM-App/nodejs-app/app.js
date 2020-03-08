/**
 * First, run Lambda Service locally using "sam local start-lambda" command.
 * Execute this file using "node app.js" command.
 */
const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const lambda = new AWS.Lambda({
    endpoint: 'http://127.0.0.1:3001/'
});

const params = {
    FunctionName: 'HelloWorldFunction',
    Payload: Buffer.from('{}')
};

// Using Lambda Invoke in a callball style instead of asyn await. Only for fun purpose.
lambda.invoke(params, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
