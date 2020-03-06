/**
 * This Lambda Function will write resized
 * image's metadata into DynamoDB table.
 */

const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
    const images = await processImageMeta(event.results.images);
};
