const async = require('async');
const _ = require('underscore');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

var startKey = [];
var results = [];
var pages = 0;

/**
 * @param iteratee This function is executed first time and all subsequent times. Like "do" part in do-while loop
 * @param truth_test Loop will execute until this function returns boolean "true"
 * @param callback This function is executed once doWhilst completes all iterations.
 */
async.doWhilst(
    // Iteratee
    (callback) => {
        const params = {
            TableName: 'adi_notes_app',
            Limit: 3
        };

        if (!_.isEmpty(startKey)) {
            params.ExclusiveStartKey = startKey;
        }

        docClient.scan(params, (err, data) => {
            if (err) {
                console.log(err);
                callback(err, {});
            } else {
                if (typeof data.LastEvaluatedKey !== 'undefined') {
                    startKey = data.LastEvaluatedKey;
                } else {
                    startKey = [];
                }

                if (!_.isEmpty(data.Items)) {
                    results = _.union(results, data.Items);
                }

                pages++;
                callback(null, results);
            }
        });
    },

    // Truth Test
    () => {
        if (_.isEmpty(startKey)) {
            return false;
        } else {
            return true;
        }
    },

    // Callback
    (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Items Count: ${data.length}`);
            console.log(`Total Pages: ${pages}`);
            console.log(JSON.stringify(data));
        }
    }
);
