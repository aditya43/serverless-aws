'use strict';

module.exports.handler = async (event, context, callback) => {
    const now = new Date();

    const message = `The time right now is ${now}`;

    console.log(message);
    callback(null, message);
}
;
