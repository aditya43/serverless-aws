module.exports.add = async event => {
    const { num1, num2 } = event; // To demonstrate API Gateway request body mapping templates, we will directly use 'event' instead of JSON.parse(event.body)

    return num1 + num2; // To demonstrate API Gateway request body mapping, we're not returning HTTP response with statusCode and all.
};
