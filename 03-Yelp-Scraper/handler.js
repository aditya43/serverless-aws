'use strict';

const { getPage, parsePage, saveRatingsToDB, deployScrapers } = require('./utils');

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

module.exports.launch_scrapers = (event, context, callback) => {
    // list business names
    const fakeDatabaseResults = [
        'urban-light-at-lacma-los-angeles',
        'the-museum-of-contemporary-art-los-angeles',
        'the-last-bookstore-los-angeles'
    ];

    // launch launch a lambda for each business name
    fakeDatabaseResults.forEach(businessName => {
        deployScrapers(businessName);
    });
};
