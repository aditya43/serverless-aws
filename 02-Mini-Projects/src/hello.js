'use strict';

module.exports.handler = async (event, context) => {
    const { name } = event.pathParameters;
    return {
        statusCode: 200,
        body: JSON.stringify({
            name,
            message: `Hello ${name}`
        })
    };
};
