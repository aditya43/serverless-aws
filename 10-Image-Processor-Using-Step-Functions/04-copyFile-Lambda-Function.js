/**
 * This Lambda Function will copy file from source S3 Bucket to
 * destination S3 Bucket.
 */

const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const s3 = new AWS.S3();

exports.handler = async event => {
    const params = {
        Bucket: process.env.DESTINATION_S3_BUCKET, // Add destination S3 bucket name to environment variable.
        CopySource: encodeURI(`/${event.s3.bucket.name}/${event.s3.object.key}`), // URI Encoded path to source file.
        Key: event.s3.object.key
    };

    await s3.copyObject(params).promise();

    return {
        region: 'ap-south-1',
        bucket: process.env.DESTINATION_S3_BUCKET,
        key: event.s3.object.key
    };
};
