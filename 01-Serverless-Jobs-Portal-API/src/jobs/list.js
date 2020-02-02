const dynamodb = require('../dynamodb');

module.exports.handler = async (event, context) => {
    try {
        const jobs = await dynamodb.scan({ TableName: 'jobs-portal' }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(jobs)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
};
