const greetings = [
    'Hello there',
    'How are you',
    'Have a nice day'
];

exports.handler = async event => {
    const name = event.pathParameters.name || 'Aditya';
    const queryStringParameters = event.queryStringParameters || {};
    const random = Math.floor(Math.random() * 2);

    const message = `${greetings[random]} ${name}`;

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            message,
            queryStringParameters
        })
    };
};
