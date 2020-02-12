module.exports.s3_notification = async event => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'Go Serverless v1.0! Your function executed successfully!',
                input: event
            },
            null,
            2
        )
    };
};
