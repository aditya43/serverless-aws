const jobs = [
    {
        id: 1,
        title: 'ReactJS Developer'
    },
    {
        id: 2,
        title: 'NodeJS Developer'
    }
];

module.exports.handler = async (event, context) => {
    const index = jobs.findIndex(job => job.id == event.pathParameters.id);

    if (index > -1) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                job: jobs[index]
            })
        };
    }

    return {
        statusCode: 404,
        body: JSON.stringify({
            message: 'Job not found'
        })
    };
};
