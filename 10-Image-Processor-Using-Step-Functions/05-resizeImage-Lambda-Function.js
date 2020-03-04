const im = require('imagemagic');
const fs = require('fs');
var os = require('os');
var uuidv4 = require('uuid/v4');
var { promisify } = require('util');
var AWS = require('aws-sdk');

const resizeAsync = promisify(im.resize);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

AWS.config.update({ region: 'ap-south-1' });

const s3 = new AWS.S3();

exports.handler = async event => {
    const bucket = event.s3.bucket.name;
    const filename = event.s3.object.key;

    // Get file from S3
    const getParams = {
        Bucket: bucket,
        Key: filename
    };

    const inputData = await s3.getObject(getParams).promise();

    // Resize the file
    const tempFile = `${os.tmpdir()}/${uuidv4()}.jpg`;

    const resizeArgs = {
        srcData: inputData.Body,
        dstPath: tempFile,
        width: process.env.IMAGE_WIDTH // Set resized image width in environment variable.
    };

    await resizeAsync(resizeArgs);

    // Read the resized file
    const resizedData = await readFileAsync(tempFile);

    // Upload the new file to S3
    const targetFileName = filename.substring(0, filename.lastIndexOf('.')) + '-small.jpg';

    const putParams = {
        Bucket: process.env.DESTINATION_BUCKET, // Set destination S3 bucket name in environment variable.
        Key: targetFileName,
        Body: Buffer.from(resizedData),
        ContentType: 'image/jpeg'
    };

    await s3.putObject(putParams).promise();
    await unlinkAsync(tempFile);

    return {
        region: 'ap-south-1',
        bucket: process.env.DESTINATION_BUCKET,
        key: targetFileName
    };
};
