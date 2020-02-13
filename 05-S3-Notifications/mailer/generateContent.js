const momentTimeZone = require('moment-timezone');

module.exports = data => {
    return new Promise((resolve, reject) => {
        try {
            // timestamp
            const timestamp = `${momentTimeZone.tz('America/Los_Angeles').format('MMMM Do, h:mm:ss a')} PT`;

            // subject line
            const subject = `New upload to S3 Bucket: ${data.bucketName}`;

            // text body
            const textBody = `
                Great news!
                Someone has uploaded ${data.file} (${data.fileSize} bytes) to your AWS S3 bucket "${data.bucketName}" on ${timestamp}.
                Congrats!
                Sincerely,
                Your Serverless Function`;

            // html body
            const htmlBody = `
                <div style="max-width: 600px; margin: 20px auto">
                <h1>Great news!</h1>
                <p style="line-height: 22px; font-size: 16px;">Someone uploaded <b>${data.file}</b> (${data.fileSize} bytes) to your AWS S3 bucket "${data.bucketName}" on ${timestamp}.</p>
                <p style="line-height: 22px; font-size: 16px;">Congrats!</p>
                <p style="line-height: 22px; font-size: 16px;">Sincerely,</p>
                <p style="line-height: 22px; font-size: 16px;"><i>Your Serverless Function</i></p>
                </div>
            `;

            console.log('Generated content.');

            resolve({
                subject,
                textBody,
                htmlBody
            });
        } catch (error) {
            console.error('Error generating email content.', error);
            reject(new Error(JSON.stringify(error)));
        }
    });
};
