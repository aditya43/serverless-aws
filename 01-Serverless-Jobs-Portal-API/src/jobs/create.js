const uuid = require('uuid');
const Joi = require('joi');

const dynamodb = require('../dynamodb');

module.exports.handler = async (event, context) => {
    const job = JSON.parse(event.body);
    const timeStamp = new Date().getTime();

    const schema = Joi.object().keys({
        title: Joi.string().required(),
        published: Joi.boolean().require()
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
            Item: {
                id: uuid.v1(),
                title: job.title,
                published: job.published,
                createdAt: timeStamp,
                updatedAt: timeStamp
            }
        };

        await dynamodb.put(params).promise();

        return {
            statusCode: 201,
            body: JSON.stringify(params.Item)
        };
    } catch (error) {
        const body = error.details ? JSON.stringify(error.details) : JSON.stringify(error);

        return {
            statusCode: 500,
            body
        };
    }
};
