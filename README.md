## About This Project
Serverless Framework with AWS & Node.JS..

```diff
- Technologies Used :
```
<table>
    <tr>
        <td>Serverless Framework</td>
        <td>AWS SAM</td>
        <td>AWS Lambda</td>
        <td>Step Functions</td>
    </tr>
    <tr>
        <td>API Gateway</td>
        <td>RDS</td>
        <td>DynamoDB</td>
        <td>ElephantSQL</td>
    </tr>
    <tr>
        <td>CloudFormation</td>
        <td>CI/CD</td>
        <td>CloudWatch</td>
        <td>CodeCommit</td>
    </tr>
    <tr>
        <td>CodeBuild</td>
        <td>CodePipeline</td>
        <td>S3 Notifications</td>
        <td>SNS</td>
    </tr>
    <tr>
        <td>SQS</td>
        <td>Cognito</td>
        <td>Lambda Crons</td>
        <td>CORS</td>
    </tr>
    <tr>
        <td>Apache VTL</td>
        <td>Swagger</td>
        <td>KMS</td>
        <td>VPCs</td>
    </tr>
    <tr>
        <td>DLQs</td>
        <td>CloudFront</td>
        <td>OICD</td>
        <td>Kinesis</td>
    </tr>
    <tr>
        <td>MQTT</td>
        <td>IoT</td>
        <td>Elastic Beanstalk</td>
        <td>ElastiCache</td>
    </tr>
</table>

```diff
+ And lot more..
```

## Author
Aditya Hajare ([Linkedin](https://in.linkedin.com/in/aditya-hajare)).

## Current Status
WIP (Work In Progress)!

## Important Notes
- [Theory](#theory)
- [AWS Lambda Limits](#aws-lambda-limits)
- [DynamoDB](#dynamodb)
- [Setup And Workflow 101](#setup-and-workflow-101)
- [New Project Setup In Pre Configured Environment 101](#new-project-setup-in-pre-configured-environment-101)
- [Installing Serverless](#installing-serverless)
- [Configuring AWS Credentials For Serverless](#configuring-aws-credentials-for-serverless)
- [Create NodeJS Serverless Service](#create-nodejs-serverless-service)
- [Invoke Lambda Function Locally](#invoke-lambda-function-locally)
- [Event - Passing Data To Lambda Function](#event---passing-data-to-lambda-function)
- [Serverless Offline](#serverless-offline)
- [NPM Run Serverless Project Locally](#npm-run-serverless-project-locally)
- [Deploy Serverless Service](#deploy-serverless-service)
- [Setup Serverless DynamoDB Local](#setup-serverless-dynamodb-local)
- [Securing APIs](#securing-apis)
- [AWS CLI Handy Commands](#aws-cli-handy-commands)
- [Common Issues](#common-issues)

## License
Open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

----------------------------------------

### Theory
- `Serverless Computing` is a cloud computing execution model in which the cloud provider dynamically manages the allocation of infrastructure resources. So we don't have to worry about managing the servers or any of the infrastructure.
- `AWS Lambda` is an `Event Driven` serverless computing platform or a `Compute Service` provided by AWS.
- The code that we run on `AWS Lambda` is called a `Lambda Function`.
- `Lambda Function` executes whenever it is triggered by a pre-configured `Event Source`.
- `Lambda Functions` can be triggered by numerous event sources like:
    * API Gateway.
    * S3 File Uploads.
    * Changes to `DynamoDB` table data.
    * `CloudWatch` events.
    * `SNS` Notifications.
    * Third Party APIs.
    * `IoT Devices`.
    * And so on..
- `Lambda Functions` run in `Containerized Environments`.
- We are charged only for the time our `Lambda Functions` are executing.
- No charge for `Idle Time`.
- Billing is done in increments of `100 ms` of the `Compute Time`.
- `AWS Lambda` uses decoupled `Permissions Model`.
- `AWS Lambda` supports 2 `Invocation Types`:
    * **Synchronous**.
    * **Asynchronous**.
- `Invocation Type` of AWS Lambda depends on the `Event Source`. For e.g.
    * `API Gateway` or `Cognito` event is `Synchronous`.
    * `S3 Event` is always `Asynchronous`.
- `pathParameters` and `queryStringParameters` are the pre-defined attributes of `API Gateway AWS Proxy Event`.
- `AWS API Gateway` expects Lambda function to return `well formed http response` instead of just the data or just the response body. At the bare-minimum, our response must have `statusCode` and `body`. For e.g.
    ```json
        {
            "statusCode" : 200,
            "body": {
                "message": "Hello Aditya"
            }
        }
    ```
- Typical code to build above response:
    ```javascript
        return {
            statusCode: 200,
            body: JSON.stringify({message: "Hello Aditya"});
        }
    ```

----------------------------------------

### AWS Lambda Limits
| Resource | Default Limit |
| --- | --- |
| Concurrent executions | 1,000 |
| Function and layer storage | 75 GB |
| Elastic network interfaces per VPC | 250 |
| Function memory allocation | 128 MB to 3,008 MB, in 64 MB increments. |
| Function timeout | 900 seconds (15 minutes) |
| Function environment variables | 4 KB |
| Function resource-based policy | 20 KB |
| Function layers | 5 layers |
| Function burst concurrency | 500 - 3000 (varies per region) |
| Invocation frequency (requests per second) |  10 x concurrent executions limit (synchronous – all sources) 10 x concurrent executions limit (asynchronous – non-AWS sources) Unlimited (asynchronous – AWS service sources  |
| Invocation payload (request and response) |  6 MB (synchronous) 256 KB (asynchronous)  |
| Deployment package size |  50 MB (zipped, for direct upload) 250 MB (unzipped, including layers) 3 MB (console editor)  |
| Test events (console editor) | 10 |
| `/tmp` directory storage | 512 MB |
| File descriptors | 1,024 |
| Execution processes/threads | 1,024 |

----------------------------------------

### DynamoDB
- Datatypes:
    * **Scaler**: Represents exactly one value.
        - For e.g. String, Number, Binary, Boolean, null.
        - `Keys` or `Index` attributes only support String, Number and Binary scaler types.
    * **Set**: Represents multiple Scaler values.
        - For e.g. String Set, Number Set and Binary Set.
    * **Document**: Represents complex structure with nested attributes.
        - Fo e.g. List and Map.
- `String` datatype can store only `non-empty` values.
- Maximum data for any item in DynamoDB is limited to `400kb`. Note: Item represents the entire row (like in RDBMS) of data.
- `Sets` are unordered collection of either Strings, Numbers or Binary values.
    * All values must be of same scaler type.
    * Do not allow duplicate values.
    * No empty sets allowed.
- `Lists` are ordered collection of values.
    * Can have multiple data types.
- `Maps` are unordered collection of `Key-Value` pairs.
    * Ideal for storing JSON documents in DynamoDB.
    * Can have multiple data types.
- DynamoDB supports 2 types of `Read Operations (Read Consistency)`:
    * `Strong Consistency`:
        - The most up-to-date data.
        - Must be requested explicitely.
    * `Eventual Consistency`:
        - May or may not reflect the latest copy of data.
        - This is the default consistency for all operations.
        - 50% Cheaper than `Strongly Consistent Read` operation.
- Internally, DynamoDB stores data in `Partitions`.
- `Partitions` are nothing but `Blocks of memory`.
- A table can have `1 or more partitions` depending on it's size and throughput.
- Each `Partition` in DynamoDB can hold maximum `10GB` of data.
- Partitioning e.g.:
    * For `500 RCU and 500 WCU` ---> `1 Partition`.
    * For `1000 RCU and 1000 WCU` ---> `2 Partitions`.

----------------------------------------

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
        sls create -t aws-nodejs

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

----------------------------------------

### New Project Setup In Pre Configured Environment 101
- Browse and open terminal into empty project directory.
- Execute :
    ```sh
        # Create aws nodejs serverless template
        sls create -t aws-nodejs

        # Init npm.
        npm init -y

        # Install serverless-offline and serverless-offline-scheduler as dev dependancies.
        npm i serverless-offline serverless-offline-scheduler --save-dev
    ```
- Add following scripts under `package.json`:
    ```json
        {
            "scripts": {
                "dev": "sls offline start --port 3000",
                "dynamodb:start": "sls dynamodb start --port 8082",
            }
        }
    ```
- Open `serverless.yml` and edit `service` name as well as setup `provider`:
    ```yml
        service: s3-notifications
        provider:
            name: aws
            runtime: nodejs12.x
            region: ap-south-1
        plugins:
            - serverless-offline    # Add this plugin if you are using it.
            - serverless-offline-scheduler  # Add this plugin if you are using it.
    ```

----------------------------------------

### Installing Serverless
- To install `Serverless` globally:
    ```sh
        sudo npm i -g serverless
    ```
- For automatic updates, after above command, run:
    ```sh
        sudo chown -R $USER:$(id -gn $USER) /Users/adiinviter/.config
    ```

----------------------------------------

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

----------------------------------------

### Create NodeJS Serverless Service
- Each service is a combination of multiple `Lambda Functions`.
- To create `NodeJS Serverless Service`:
    ```sh
        sls create --t aws-nodejs
    ```

----------------------------------------

### Invoke Lambda Function Locally
- To invoke a `Lambda Function` locally:
    ```sh
        # Syntax
        sls invoke local -f [FUNCTION_NAME]

        # Example
        sls invoke local -f myfunct
    ```

----------------------------------------

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

----------------------------------------

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

----------------------------------------

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

----------------------------------------

### Deploy Serverless Service
- To deploy serverless service, run:
    ```sh
        # -v: For verbose.
        sls deploy -v
    ```

----------------------------------------

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

----------------------------------------

### Securing APIs
- APIs can be secured using `API Keys`.
- To generate and use `API Keys` we need to modify `serverless.yml` file:
    * Add `apiKeys` section under `provider`:
        ```yml
            provider:
                name: aws
                runtime: nodejs12.x
                ########################################################
                apiKeys:                # For securing APIs using API Keys.
                    - todoAPI           # Provide name for API Key.
                ########################################################
                stage: dev              # Stage can be changed while executing deploy command.
                region: ap-south-1      # Set region.
                timeout: 300
        ```
    * Route by Route, specify whether you want it to be `private` or not. For e.g.
        ```yml
            functions:
                getTodo:    # Secured route.
                    handler: features/read.getTodo
                    events:
                        - http:
                            path: todo/{id}
                            method: GET
                            ########################################################
                            private: true   # Route secured.
                            ########################################################
                listTodos:  # Non-secured route.
                    handler: features/read.listTodos
                    events:
                        - http:
                            path: todos
                            method: GET
        ```
    * After deploying we will receive `api keys`. Copy it to pass it under headers.
        ```sh
            λ serverless offline start
            Serverless: Starting Offline: dev/ap-south-1.
            Serverless: Key with token: d41d8cd98f00b204e9800998ecf8427e    # Here is our API Key token.
            Serverless: Remember to use x-api-key on the request headers
        ```
    * Pass `api key` under `x-api-key` header while hitting secured route.
        ```javascript
            x-api-key: d41d8cd98f00b204e9800998ecf8427e
        ```
    * If a wrong/no value is passed under `x-api-key` header, then we will receive `403 Forbidden` error.

----------------------------------------

### AWS CLI Handy Commands
- Useful commands for project `05-S3-Notifications`:
    * Setup aws profile for `Serverless S3 Local` plugin:
        ```sh
            aws s3 configure --profile s3local

            # Use following credentials:
            # aws_access_key_id = S3RVER
            # aws_secret_access_key = S3RVER
        ```
    * Trigger S3 event - Put file into local S3 bucket:
        ```sh
            aws --endpoint http://localhost:8000 s3api put-object --bucket "aditya-s3-notifications-serverless-project" --key "ssh-config.txt" --body "D:\Work\serverless\05-S3-Notifications\tmp\ssh-config.txt" --profile s3local
        ```
    * Trigger S3 event - Delete file from local S3 bucket:
        ```sh
            aws --endpoint http://localhost:8000 s3api delete-object --bucket "aditya-s3-notifications-serverless-project" --key "ssh-config.txt" --profile s3local
        ```

----------------------------------------

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
