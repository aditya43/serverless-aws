'use strict';

const { getPage, parsePage, saveRatingsToDB } = require('./utils');

module.exports.scrape = async event => {
    getPage(event)
        .then(page => parsePage(page));

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event
        }, null, 2)
    };
};
