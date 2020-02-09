'use strict';

module.exports.read = async (event, context, callback) => {
    const message = 'GET route hit';
    return {
        statusCode: 200,
        body: JSON.stringify({ message }, null, 2)
    };
};
