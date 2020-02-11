const db = require('../db');

module.exports.deleteTodo = async event => {
    try {
        const id = event.pathParameters.id;

        if (id) {
            const deletedRowsCount = await db.todo.destroy({ where: { id } });

            if (deletedRowsCount > 0) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Task has been deleted' }, null, 2)
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
}
;
