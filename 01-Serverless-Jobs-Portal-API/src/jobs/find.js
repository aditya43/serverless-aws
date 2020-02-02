const dynamodb = require('../dynamodb');
const Joi = require('joi');

module.exports.handler = async (event, context) => {
    try {
        const id = event.pathParameters.id;

        const schema = Joi.object().keys({
            id: Joi.string().require()
        });

        const { error } = Joi.validate(id, schema);

        if (error) {
            const err = new Error('Validations failed');
            err.details = error.details || {};

            throw err;
        }

        const result = await dynamodb.get({
            TableName: 'jobs-portal',
            Key: { id }
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(result.item)
        };
    } catch (error) {
        const body = error.details ? JSON.stringify(error.details) : JSON.stringify(error);

        return {
            statusCode: 500,
            body
        };
    }
};
