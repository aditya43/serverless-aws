const db = require('../db');

module.exports.updateTodo = async event => {
    try {
        const id = event.pathParameters.id;
        const body = JSON.parse(event.body);

        if (id) {
            const [rowsAffected, todoArr] = await db.todo.update(body, {
                where: { id },
                returning: true
            });

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: `${rowsAffected} row(s) were affected`,
                    todo: todoArr[0] || {}
                }, null, 2)
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
