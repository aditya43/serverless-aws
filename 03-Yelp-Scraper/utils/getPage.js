const request = require('request-promise');

module.exports = async businessName => {
    const url = `https://www.yelp.com/biz/${businessName}`;

    return request({ url, method: 'GET' });
};
