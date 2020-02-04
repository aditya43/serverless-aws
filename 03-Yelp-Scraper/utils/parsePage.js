const cheerio = require('cheerio');

module.exports = page => {
    try {
        const $ = cheerio.load(page);

        const rating = $('.i-stars__373c0__Y2F3O .lemon--div__373c0__1mboc');
        const reviewCount = $('.lemon--p__373c0__3Qnnj .text__373c0__2pB8f .text-color--mid__373c0__3G312 .text-align--left__373c0__2pnx_ .text-size--large__373c0__1568g');

        console.log(rating, reviewCount);
    } catch (error) {
        return Promise.reject(error);
    }
};
