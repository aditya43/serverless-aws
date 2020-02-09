module.exports.createTodo = async (event, context, callback) => {
    const body = JSON.parse(event.body);

    const mockDB = `Saved to db: ${body.todo}`;

    return {
        statusCode: 200,
        body: JSON.stringify({ todo: mockDB }, null, 2)
    };
};
