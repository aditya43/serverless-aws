const AWS = require('aws-sdk');

module.exports = businessName => {
    const lambda = new AWS.Lambda({
        region: 'us-west-2'
    });

    const params = {
        FunctionName: 'yelp-scraper-dev-scrape',
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify(businessName)
    };

    return lambda.invoke(params, function (error, data) {
        if (error) {
            console.error(JSON.stringify(error));
            return new Error(`Error scraping: ${JSON.stringify(error)}`);
        } else if (data) {
            console.log(data);
            return JSON.stringify(data);
        }
    });
};
