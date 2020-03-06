/**
 * This Lambda Function will write resized
 * image's metadata into DynamoDB table.
 */

const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

const processImageMeta = async images => {
    let original, thumbnail;

    const filesProcessed = images.map(async image => {
        for (const key in image) {
            switch (key) {
                case 'original':
                    original = `${image.original.region}|${image.original.bucket}|${image.original.key}`;
                    break;

                case 'resized': // Thumbnail
                    thumbnail = `${image.thumbnail.region}|${image.thumbnail.bucket}|${image.thumbnail.key}`;
                    break;

                default:
                    break;
            }
        }
    });

    await Promise.all(filesProcessed);

    return {
        original,
        thumbnail
    };
};

exports.handler = async event => {
    const images = await processImageMeta(event.results.images);

    const params = {
        TableName: process.env.RESIZED_IMAGES_METADATA_TABLENAME, // Add DynamoDB table name to store resized images metadata to environment variable.
        Item: {
            original: images.original,
            thumbnail: images.thumbnail,
            timestamp: new Date().getTime()
        }
    };

    await documentClient.put(params).promise();
    return true;
};
