const Joi = require('joi');

const dynamodb = require('../dynamodb');

module.exports.handler = async (event, context) => {
    const job = JSON.parse(event.body);
    const timeStamp = new Date().getTime();
    const id = event.pathParameters.id;

    const schema = Joi.object().keys({
        title: Joi.string(),
        published: Joi.boolean()
    });

    try {
        const { error } = Joi.validate(job, schema);

        if (error) {
            const err = new Error('Validations failed');
            err.details = error.details || {};

            throw err;
        }

        const params = {
            TableName: 'jobs-portal',
            Key: { id },
            UpdateExpression: 'SET title=:title, published=:published, updatedAt=:updatedAt',
            ExpressionAttributeValues: {
                ':title': job.title,
                ':published': job.published,
                ':updatedAt': timeStamp
            },
            ReturnValues: 'ALL_NEW'
        };

        const results = await dynamodb.update(params).promise();

        return {
            statusCode: 201,
            body: JSON.stringify(results.Attributes)
        };
    } catch (error) {
        const body = error.details ? JSON.stringify(error.details) : JSON.stringify(error);

        return {
            statusCode: 500,
            body
        };
    }
};
