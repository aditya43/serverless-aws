exports.handler = async event => {
    const eventJSON = JSON.stringify(event, null, 2);

    console.log(eventJSON);

    return {
        statusCode: 200,
        body: eventJSON
    };
};
