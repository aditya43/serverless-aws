module.exports.s3_notification = async event => {
    const uploadData = event.Records.map(record => ({
        bucketName: record.s3.bucket.name,
        file: record.s3.object.key,
        size: record.s3.object.size
    }))[0];
    console.log(uploadData);
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify(
    //         {
    //             message: 'Go Serverless v1.0! Your function executed successfully!',
    //             input: event
    //         },
    //         null,
    //         2
    //     )
    // };
};
