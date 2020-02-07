const cheerio = require('cheerio');

module.exports = page => {
    try {
        // eslint-disable-next-line no-unused-vars
        const $ = cheerio.load(page);

        // Actual values:
        // const rating = $('.rating-info .i-stars').attr('title').trim().split(' ')[0];
        // const reviewCount = $('.rating-info .review-count').text().trim().split(' ')[0];

        // Dummy values:
        const rating = 4.5;
        const reviewCount = 4805;

        return Promise.resolve({ rating, reviewCount });
    } catch (error) {
        return Promise.reject(error);
    }
};
