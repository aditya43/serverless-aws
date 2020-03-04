const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const stepFunctions = new AWS.StepFunctions();

exports.handler = async event => {
    const params = {
        stateMachineArn: 'arn:aws:states:ap-south-1:983038403:stateMachine:AdityaTest',
        input: JSON.stringify(event)
        // name: 'unique_string' // Optional param. We can use npm package to generate uuid here.
    };

    const data = await stepFunctions.startExecution(params).promise();
    return data;
};
