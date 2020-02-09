'use strict';

module.exports.getTodo = async event => {
    const todo = 'Make dinner';
    return {
        statusCode: 200,
        body: JSON.stringify({ todo }, null, 2)
    };
};
