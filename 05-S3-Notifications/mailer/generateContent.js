module.exports = () => {
    return new Promise((resolve, reject) => {
        try {

        } catch (error) {
            console.log(error);
            reject(new Error(JSON.stringify(error)));
        }
    });
};
