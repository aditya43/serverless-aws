const db = require('../db');

module.exports.listTodos = async event => {
    try {
        const tasks = await db.todo.findAll({
            attributes: ['id', 'task', 'completed']
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ tasks }, null, 2)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: error.message || '',
                error: error
            }, null, 2)
        };
    }
};

module.exports.getTodo = async event => {
    try {
        const id = event.pathParameters.id;

        if (id) {
            const task = await db.todo.findOne({
                where: { id },
                attributes: ['id', 'task', 'completed']
            });

            if (task) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ task }, null, 2)
                };
            }

            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Task not found' }, null, 2)
            };
        }

        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing task id' }, null, 2)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: error.message || '',
                error: error
            }, null, 2)
        };
    }
};
