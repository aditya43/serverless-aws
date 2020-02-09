'use strict';

module.exports.firstGET = async (event, context, callback) => {
    const message = 'GET route hit';
    return {
        statusCode: 200,
        body: JSON.stringify({ message }, null, 2)
    };
};
