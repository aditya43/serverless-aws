'use strict';

const { getPage, parsePage, saveRatingsToDB } = require('./utils');

module.exports.scrape = async (event, context, callback) => {
    getPage(event)
        .then(page => parsePage(page))
        .then(yelpData => saveRatingsToDB(yelpData, event))
        .then(() => callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: `Scraped ${event}`
            }, null, 2)
        }))
        .catch(error => callback(error));
};
