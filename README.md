## About This Project
AWS Serverless With Node.JS.
- AWS SAM (Serverless Architecture Model).
- AWS Lambda.
- AWS API Gateway.
- RDS.
- DynamoDB.
- ElephantSQL.
- S3 Notifications.

## Author
Aditya Hajare ([Linkedin](https://in.linkedin.com/in/aditya-hajare)).

## Current Status
WIP (Work In Progress)!

## Important Notes
- [Setup And Workflow 101](#setup-and-workflow-101)
- [Installing Serverless](#installing-serverless)
- [Configuring AWS Credentials For Serverless](#configuring-aws-credentials-for-serverless)
- [Create NodeJS Serverless Service](#create-nodejs-serverless-service)
- [Invoke Lambda Function Locally](#invoke-lambda-function-locally)
- [Event - Passing Data To Lambda Function](#event---passing-data-to-lambda-function)
- [Serverless Offline](#serverless-offline)
- [NPM Run Serverless Project Locally](#npm-run-serverless-project-locally)
- [Deploy Serverless Service](#deploy-serverless-service)
- [Setup Serverless DynamoDB Local](#setup-serverless-dynamodb-local)
- [Common Issues](#common-issues)

## License
Open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

### Setup And Workflow 101
- Setup:
    ```sh
        # Install serverless globally.
        sudo npm i -g serverless

        # (Optional) For automatic updates.
        sudo chown -R $USER:$(id -gn $USER) /Users/adiinviter/.config

        # Configure user credentials for aws service provider.
        sls config credentials --provider aws --key [ACCESS_KEY] --secret [SECRET_KEY] -o

        # Create aws nodejs serverless template.
        sls create --t aws-nodejs

        # Init npm.
        npm init -y

        # Install serverless-offline and serverless-offline-scheduler as dev dependancies.
        npm i serverless-offline serverless-offline-scheduler --save-dev
    ```
- After running above commands, update the `service` property in `serverless.yml` with your service name.
    * **NOTE:** `service` property in `serverless.yml` file is mostly your project name. It is not a name of your specific lambda function.
- Add following scripts under `package.json`:
    ```json
        {
            "scripts": {
                "dev": "sls offline start --port 3000",
                "dynamodb:start": "sls dynamodb start --port 8082",
            }
        }
    ```
- Update `serverless.yml` file with following config:
    ```yml
        service: my-project-name
        plugins:
            - serverless-offline    # Add this plugin if you are using it.
            - serverless-offline-scheduler  # Add this plugin if you are using it.
        provider:
            name: aws
            runtime: nodejs12.x
            stage: dev              # Stage can be changed while executing deploy command.
            region: ap-south-1      # Set region.
    ```
- To add new lambda function with api endpoint, add following in `serverless.yml`:
    ```yml
        functions:
            hello:
                handler: src/controllers/users.find
            events:
                - http:
                    path: users/{id}
                    method: GET
                    request:
                        parameters:
                            id: true
    ```
- To run project locally:
    ```sh
        # Using npm
        npm run dev

        # Directly using serverless
        sls offline start --port 3000
    ```
- To invoke lambda function locally:
    ```sh
        sls invoke local -f [FUNCTION_NAME]
    ```
- To run lambda crons locally:
    ```sh
        sudo sls schedule
    ```
- To deploy:
    ```sh
        # To deploy all lambda functions.
        sls deploy -v

        # To deploy a specific function.
        sls deploy -v -f [FUNCTION_NAME]

        # To deploy project on a different stage (e.g. production)
        sls deploy -v -s production
    ```
- To view logs for a specific function in a specific stage (e.g. dev, prod):
    ```sh
        # Syntax:
        sls logs -f [FUNCTION_NAME] -s [STAGE_NAME] --startTime 10m

        # Use -t to view logs in real time. Good for monitoring cron jobs.
        sls logs -f [FUNCTION_NAME] -s [STAGE_NAME] -t

        # Example #1:
        sls logs -f sayHello -s production --startTime 10m

        # Example #2:
        sls logs -f sayHello -s dev --startTime 15m
    ```
- To remove project/function:
    ```sh
        # To remove everything.
        sls remove -v -s [STAGE_NAME]

        # To remove a specific function from a specific stage.
        sls remove -v -f sayHello -s dev
    ```
- To create a simple cron job lambda function, add this to `serverless.yml`:
    ```yaml
        # Below code will execute 'cron.handler' every 1 minute
        cron:
            handler: /src/cron.handler
            events:
                - schedule: rate(1 minute)
    ```

### Installing Serverless
- To install `Serverless` globally:
    ```sh
        sudo npm i -g serverless
    ```
- For automatic updates, after above command, run:
    ```sh
        sudo chown -R $USER:$(id -gn $USER) /Users/adiinviter/.config
    ```

### Configuring AWS Credentials For Serverless
- To configure aws user credentials, run:
    ```sh
        # -o: To overwrite existing credentials if there are any set already.
        sls config credentials --provider aws --key [ACCESS_KEY] --secret [SECRET_KEY] -o
    ```
- After running above command, credentials will get set under following path:
    ```sh
        ~/.aws/credentials
    ```

### Create NodeJS Serverless Service
- Each service is a combination of multiple `Lambda Functions`.
- To create `NodeJS Serverless Service`:
    ```sh
        sls create --t aws-nodejs
    ```

### Invoke Lambda Function Locally
- To invoke a `Lambda Function` locally:
    ```sh
        # Syntax
        sls invoke local -f [FUNCTION_NAME]

        # Example
        sls invoke local -f myfunct
    ```

### Event - Passing Data To Lambda Function
- To pass data to lambda function,
    ```sh
        # Syntax
        sls invoke local -f [FUNCTION_NAME] -d [DATA]

        # Example #1: to pass a single string value into lambda function.
        sls invoke local -f sayHello -d 'Aditya'

        # Example #2: to pass a object into lambda function.
        sls invoke local -f sayHello -d '{"name": "Aditya", "age": 33}'
    ```
- `event` object holds any data passed into lambda function. To access it:
    * Accessing data directly passed as string as shown in `Example #1` above:
        ```javascript
            // Example #1: to pass a single string value into lambda function.
            // sls invoke local -f sayHello -d 'Aditya'

            module.exports.hello = async event => {
                const userName = event; // Data is available on 'event'.
                return {
                    statusCode: 200,
                    body: JSON.stringify({message: `Hello ${userName}`})
                };
            };
        ```
    * Accessing object data passed as shown in `Example #2` above:
        ```javascript
            // Example #2: to pass a object into lambda function.
            // sls invoke local -f sayHello -d '{"name": "Aditya", "age": 33}'

            module.exports.hello = async event => {
                const {name, age} = event;

                return {
                    statusCode: 200,
                    body: JSON.stringify({message: `Hello ${name}, Age: ${age}`})
                };
            };
        ```


### Serverless Offline
- For **local development only**, use `Serverless Offline` plugin.
- Plugin:
    ```
        https://www.npmjs.com/package/serverless-offline
        https://github.com/dherault/serverless-offline
    ```
- To install:
    ```sh
        npm i serverless-offline --save-dev
    ````

### NPM Run Serverless Project Locally
- Install [Serverless Offline](#serverless-offline) plugin.
- Under `serverless.yml`, add:
    ```yml
        plugins:
            - serverless-offline
    ```
- Under `package.json`, add new run script:
    ```json
        "dev": "sls offline start --port 3000"
    ```
- Run:
    ```sh
        npm run dev
    ```

### Deploy Serverless Service
- To deploy serverless service, run:
    ```sh
        # -v: For verbose.
        sls deploy -v
    ```

### Setup Serverless DynamoDB Local
- Use following plugin to setup DynamoDB locally (for offline uses):
    ```
        https://www.npmjs.com/package/serverless-dynamodb-local
        https://github.com/99xt/serverless-dynamodb-local#readme
    ```
- To setup:
    ```sh
        npm i serverless-dynamodb-local
    ```
- Register `serverless-dynamodb-local` into serverless yaml:
    ```yml
        plugins:
            - serverless-dynamodb-local
    ```
- Install DynamoDB into serverless project:
    ```sh
        sls dynamodb install
    ```

### Common Issues
- After running `sls deploy -v`, error: **`The specified bucket does not exist`**:
    * **Cause:** This issue occurs when we manually delete S3 bucket from AWS console.
    * **Fix:** Login to AWS console and delete stack from `CloudFormation`.
    * **Dirty Fix (Avoid):** Delete `.serverless` directory from project (Serverless Service).
    * **Full Error (Sample):**
    ```sh
        Serverless: Packaging service...
        Serverless: Excluding development dependencies...
        Serverless: Uploading CloudFormation file to S3...

        Serverless Error ---------------------------------------

        The specified bucket does not exist

        Get Support --------------------------------------------
            Docs:          docs.serverless.com
            Bugs:          github.com/serverless/serverless/issues
            Issues:        forum.serverless.com

        Your Environment Information ---------------------------
            Operating System:          darwin
            Node Version:              13.7.0
            Framework Version:         1.62.0
            Plugin Version:            3.3.0
            SDK Version:               2.3.0
            Components Core Version:   1.1.2
            Components CLI Version:    1.4.0
    ```