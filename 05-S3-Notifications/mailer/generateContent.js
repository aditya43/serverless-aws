const momentTimeZone = require('moment-timezone');

module.exports = () => {
    return new Promise((resolve, reject) => {
        try {
            const timestamp = `${momentTimeZone.tz()}`;
        } catch (error) {
            console.log(error);
            reject(new Error(JSON.stringify(error)));
        }
    });
};
