exports.getResponseHeaders = () => {
    return {
        'Access-Control-Allow-Origin': '*'
    };
};

exports.getUserId = headers => {
    return headers.app_user_id;
};

exports.getUserName = headers => {
    return headers.app_user_name;
};
