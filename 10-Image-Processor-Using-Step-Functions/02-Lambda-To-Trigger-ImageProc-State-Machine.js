/**
 * This Lambda function will be triggered by S3 event.
 * S3 Event: Whenever a file is uploaded to 'X' bucket, it will fire up
 * notification to invoke this Lambda function.
 *
 * This function can handle multiple file uploads simultaneously.
 */

const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const stepFunctions = new AWS.StepFunctions();

exports.handler = async event => {
    const filesProcessed = event.Records.map(async record => {
        const params = {
            stateMachineArn: process.env.STATE_MACHINE_ARN, // Add State Machine ARN to environment variable.
            input: JSON.stringify(record)
        };

        const data = await stepFunctions.startExecution(params).promise();

        console.log(data);
        return data;
    });

    const results = await Promise.all(filesProcessed);

    return results;
};
