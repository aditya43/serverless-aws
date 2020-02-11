const db = require('../db');

module.exports.createTodo = async event => {
    try {
        const body = JSON.parse(event.body);

        if (!body.task) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid task' }, null, 2)
            };
        }

        const task = await db.todo.create({ task: body.task });
        return {
            statusCode: 201,
            body: JSON.stringify({ todo: task }, null, 2)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: db }, null, 2)
        };
    }
};
