// Make sure this Lambda Function has appropriate IAM permissions to invoke Lambda Function.

const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const lambda = new AWS.Lambda();

exports.handler = async event => {
    const number = event.number;
    const payload = JSON.stringify({
        operation: 'multiply',
        input: {
            operand1: number,
            operand2: number
        }
    });

    const params = {
        FunctionName: 'calculator', // Lambda Function name to invoke.
        Payload: payload,
        InvocationType: 'RequestResponse' // RequestResponse = Synchronous Lambda Invocation. Use "Event" for asynchronous invocation. In this case, we do want the response whic is why we are using Synchronous invocation.
    };

    const response = await lambda.invoke(params).promise();
    const output = JSON.parse(response.Payload);

    return output.body;
};
