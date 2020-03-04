/**
 * The 'event' data for this Lambda Function will be a single
 * S3 PUT Record, that we received as input to State Machine.
 */

exports.handler = async event => {
    const filename = event.s3.object.key; // Filename
    const index = filename.lastIndexOf('.');

    if (index > 0) {
        return filename.substring(index + 1); // Return file extension.
    }

    return null;
};
