const mailer = require('nodemailer');
const config = require('./config');

module.exports = content => {
    return new Promise((resolve, reject) => {
        // configure transporter
        const transporter = mailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: 'gmail',
            auth: {
                user: config.user,
                pass: config.password
            }
        });
        // create recipient string
        let recipients = '';
        config.to.forEach(recipient => (recipients += `${recipient}, `));
        // define email options
        const mailOptions = {
            from: 'person@gmail.com',
            to: recipients,
            subject: content.subject,
            text: content.textBody,
            html: content.htmlBody
        };
        // send the email
        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                const errorMessage = JSON.stringify(error);
                console.error('Error sending email.', errorMessage);
                reject(new Error(errorMessage));
            } else {
                const successMessage = `Message ${info.messageId} send: ${info.response}`;
                console.log(successMessage);
                resolve(successMessage);
            }
        });
    });
};
