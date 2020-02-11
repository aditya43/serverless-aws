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
            body: JSON.stringify({ error }, null, 2)
        };
    }
};
