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
        <td>OIDC</td>
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
- [Architecture Patterns - Multi-Tier Architecture](#architecture-patterns---multi---tier-architecture)
- [Architecture Patterns - Microservices Architecture](#architecture-patterns---microservices-architecture)
- [AWS Lambda Limits](#aws-lambda-limits)
- [DynamoDB](#dynamodb)
- [AWS Step Functions](#aws-step-functions)
- [AWS SAM](#aws-sam)
- [CICD 101](#cicd-101)
- [Serverless Security Best Practices 101](#serverless-security-best-practices-101)
- [Best Practices 101 - AWS Lambda](#best-practices-101---aws-lambda)
- [Best Practices 101 - AWS API Gateway](#best-practices-101---aws-api-gateway)
- [Best Practices 101 - DynamoDB](#best-practices-101---dynamodb)
- [Best Practices 101 - Step Functions](#best-practices-101---step-functions)
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
- Every AWS account comes with a default `VPC (Virtual Private Cloud)`.
- At the moment, `AWS Lambda Function` can run upto a maximum of `15 Minutes`.
- Returning `HTTP` responses from `AWS Lambda` allows us to integrate them with `Lambda Proxy Integration` for `API Gateway`.
- A `Step Function` can run upto a maximum period of `1 Year`.
- **`Step Functions` allows us to combine different `Lambda Functions` to build `Serverless Applications` and `Microservices`.**
- There could be different reasons why you may want to restrict your `Lambda Function` to run within a given `VPC`. For e.g.
    * You may have an `Amazon RDS` instance running on `EC2` inside your `VPC` and you want to connect to that instance through `Lambda` without exposing it to outside world. In that case, your `Lambda Function` must run inside that `VPC`.
    * When a `Lambda Function` is attached to any `VPC`, it automatically loses access to the internet. Unless ofcourse you open a `Port` on your `VPC Security Group` to allow `Outbound Connections`.
    * While attaching `Lambda Function` to `VPC`, we must select at least 2 `Subnets`. Although we can choose more `Subnets` if we like.
    * When we are using `Serverless Framework`, all this including assigning necessary permissions etc. is taken care of automatically by the `Serverless Framework`.
- `Tags` are useful for organising and tracking our billing.
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
- **Lambda Versioning:**
    * When we don't explicitely create an user version, Lambda will use the `$LATEST` version.
    * The latest version is always denoted by `$LATEST`.
    * The last edited version is always marked as `$LATEST` one.
- **(Without using Lambda Aliases) How to use different version of Lambda Function in API Gateway? Bad Way!**
    1. Under AWS Console, go to `API Gateway`.
    2. Click on `Request (GET/POST/PUT/PATCH/DELETE)` under `Resource`.
    3. Click on `Integration Request`.
    4. Configure `Lambda Function` setting with a value of version seperated by colon.
    5. Re-deploy the API.
    6. For e.g.
        ```javascript
            // Lambda Function name: adiTest
            // Available Lambda Function versions: v1, v2, v3 ..etc.
            // To use v2 for API Gateway GET Request, set Lambda Function value as below:
            {
                "Lambda Function": "adiTest:2"
            }
        ```
- **Need for Lambda Aliases:**
    * Without `Lambda Aliases`, whenever we publish a new `Lambda Version`, we will manually have to edit API Gateway to use new `Lambda Version` and then republish the API (Refer to above steps).
    * Everytime we publish a new `Lambda Version`, `API Gateway` should automatically pick up the change without we having to re-deploy the API. `Lambda Aliases` helps us achive this.
- **Lambda Aliases:**
    * It's a good practice to create 1 `Lambda Alias` per `Environment`. For e.g. We could have aliases for dev, production, stage etc. environments.
    * While configuring `Lambda Alias`, we can use `Additional Version` setting for `Split Testing`.
    * `Split Testing` allows us to split user traffic between multiple `Lambda Versions`.
    * To use `Lambda Alias` in `API Gateway`, we simply have to replace `Version Number` (Seperated by colon) under `Lambda Function` setting (in `API Gateway` settings), with an `Alias`.
    * Re-deploy the API.
    * For e.g.
        ```javascript
            // Lambda Function name: adiTest
            // Available Lambda Function versions: v1, v2, v3 ..etc.
            // Available Lambda Function aliases: dev, stage, prod ..etc.

            // Aliases are pointing to following Lambda versions:
            {
                "dev": "v1",
                "stage": "v2",
                "prod": "$LATEST"
            }

            // To use v2 for API Gateway GET Request, set Lambda Function value as below:
            {
                "Lambda Function": "adiTest:stage"
            }
        ```
- **Stage Variables in API Gateway:**
    * Everytime we make changes to `API Gateway`, we don't want to update the `Alias Name` in every `Lambda Function` before deploying the corrosponding `Stage`. To address this challenge, we can make use of what is called as `Stage Variables in API Gateway`.
    * `Stage Variables` can be used for various puposes like:
        - Choosing backend database tables based on environment.
        - For dynamically choosing `Lambda Alias` corrosponding to the current `Stage`.
        - Or any other configuration.
    * `Stage Variables` are available inside `context` object of `Lambda Function`.
    * Since `Stage Variables` are available inside `context` object, we can also use them in `Body Mapping Templates`.
    * `Stage Variables` can be used as follows:
        - Inside `API Gateway Resource Configuration`, to choose `Lambda Function Alias` corrosponding to the current stage:
        ```javascript
            // Use ${stageVariables.variableName}

            {
                "Lambda Function": "myFunction:${stageVariables.variableName}"
            }
        ```
- **Canary Deployment:**
    * Related to `API Gateways`.
    * Used for traffic splitting between different versions in `API Gateways`.
    * Use `Promote Canary` option to direct all traffic to latest version once our testing using traffic splitting is done.
    * After directing all traffic to latest version using `Promote Canary` option, we can choose to `Delete Canary` once we are sure.
- **Encryption For Environment Variables In Lambda:**
    * By default `Lambda` uses default `KMS` key to encrypt `Environment Variables`.
    * `AWS Lambda` has built-in encryption at rest and it's enabled by default.
    * When our `Lambda` uses `Environment Variables` they are automatically encrypted by `Default KMS Key`.
    * When the `Lambda` function is invoked, `Environment Variables` are automatically `decrypted` and made available in `Lambda Function's code`.
    * However, this only takes care of `Encryption at rest`. But during `Transit` for e.g. when we are deploying the `Lambda Function`, these `Environment Variables` are still transferred in `Plain Text`.
    * So, if `Environment Variables` posses sensitive information, we can enable `Encryption in transit`.
    * If we enable `Encryption in transit` then `Environment Variable Values` will be masked using `KMS Key` and we must decrypt it's contents inside `Lambda Functions` to get the actual values stored in variables.
    * While creating `KMS Keys`, be sure to choose the `Region` same as our `Lambda Function's Region`.
    * Make sure to give our `Lambda Function's Role` a permission to use `KMS Key` feature inside `KMS Key's` policy.
- **Retry Behavior in AWS Lambda:**
    * `Lambda Functions` have built-in `Retry Behavior`. i.e. When a `Lambda Functions` fails, `AWS Lambda` automatically attempts to retry the execution up to **`2 Times`** if it was invoked `Asynchronously (Push Events)`.
    * A lambda function could fail for different reasons such as:
        - Logical or Syntactical error in Lambda Function's code.
        - Network outage.
        - A lambda function could hit the timeout.
        - A lambda function run out of memory.
        - And so on..
    * When any of above things happen, Lambda function will throw an `Exception`. How this `Exception` is handled depends upon how the `Lambda Function` was invoked i.e. `Synchronously or Asynchronously (Push Events)`.
    * If the `Lambda Function` was invoked `Asynchronously (Push Events)` then `AWS Lambda` will automatically retry up to `2 Times (With some time delays in between)` on execution failure.
    * If we configure a `DLQ (Dead Letter Queue)`, it will collect the `Payload` after subsequent retry failures i.e. after `2 Attempts`.
    * If a function was invoked `Synchronously` then calling application will receive `HTTP 429` error when function execution fails.
    * If a `DLQ (Dead Letter Queue)` is not configured for `Lambda Function`, it will discard the event after 2 retry attempts.
- **Container Reuse:**
    * `Lambda Function` executes in `Containerized Environments`.
    * Whenever we create or update a `Lambda Function` i.e. either the function code or configuration, `AWS Lambda` creates a new `Container`.
    * Whenever `Lambda Function` is executed first time i.e. after we create it or update, `AWS Lambda` creates a new `Container`.
    * Once the `Lambda Function` execution is finished, `AWS Lambda` will shut down the `Container` after a while.
    * Code written outside `Lambda Handler` will be executed once per `Container`. For e.g.
        ```javascript
            // Below code will be executed once per container.
            const AWS = require('aws-sdk);
            AWS.config.update({ region: 'ap-south-1' });
            const s3 = new AWS.S3();

            // Below code (code inside Lambda handler) will be executed everytime Lambda Function is invoked.
            exports.handler = async (event, context) => {
                return "Hello Aditya";
            };
        ```
    * It's a good practice to write all initialisation code outside the `Lambda Handler`.
    * If you have written any file in `\tmp` and a `Container` is reused for `Lambda Function Execution`, that file will be available in subsequent invocations.
    * It will result in faster executions whenever `Containers` are reused.
    * We do not have any control over when `AWS Lambda` will reuse the `Container` or when it won't.
    * If we are spawning any background processes in `Lambda Functions`, they will be executed only until `Lambda Handler` returns a response. Other time they will stay `Frozen`.
- **Running a `Lambda Function` inside a `VPC` will result in `Cold Starts`. `VPC` also introduce some delay before a function could execute which could result in `Cold Start`.**
- **`Resource Policies`** gets applied at the `API Gateway` level whereas **`IAM Policies`** gets applied at the `User/Client` level.

----------------------------------------

### Architecture Patterns - Multi-Tier Architecture
- Most common architecture pattern that we almost find everywhere irrespective of whether we are using servers or going serverless.
- The most common form of `Multi-Tier Architecture` is the `3-Tier Architecture`. Even the `Serverless` form will have same `3-Tiers` as below:
    * `Frontend/Presentation Tier`.
    * `Application/Logic Tier`.
    * `Database/Data Tier`.
- In `Serverless 3-Tier Architecture`,
    * `Database/Data Tier`.
        - The `Database/Data Tier` will contain the databases (`Data Stores`) like `DynamoDB`.
        - `Data Stores` falls into 2 categories:
            * **`IAM Enabled`** data stores (over `AWS APIs`). These data stores allows applications to connect to them through `AWS APIs`. For e.g. `DynamoDB`, `Amazon S3`, `Amazon ElasticSearch Service` etc.
            * **`VPC Hosted`** data stores (using database credentials). These data stores runs in hosted instances within a `VPC`. For e.g. `Amazon RDS`, `Amazon Redshift`, `Amazon ElastiCache`. And ofcourse we can install any database of our choice on `EC2` and use it here. For e.g. we can run a `MongoDB` instance on `EC2` and connect to it through `Serverless Lambda Functions`.
    * `Application/Logic Tier`.
        - This is where the core business logic of our `Serverless Application` runs.
        - This is where core `AWS Services` like `AWS Lambda`, `API Gateway`, `Amazon Cognito` etc. come into play.
    * `Frontend/Presentation Tier`.
        - This tier interacts with backend through `Application/Logic Tier`.
        - For e.g. Frontend could use `API Gateway Endpoint` to call `Lambda Functions` which inturn interacts with data stores available in the `Database/Data Tier`.
        - `API Gateway Endpoints` can be consumed by variety of applications such as `Web Apps` like static websites hosted on `S3`, `Mobile Application Frontends`, `Voice Enabled Devices Like Alexa` or different `IoT Devices`.

----------------------------------------

### Architecture Patterns - Microservices Architecture
- Typical use case of `Serverless Architecture` is the `Microservices Architecture Pattern`.
- The `Microservices Architecture Pattern` is an approach to developing single application as a **suit of small services**, each running in its own process and communicating with lightweight mechanisms, ofteb ab HTTP resource API.
- These services are built around business capabilities and are **independently deployable** by fully automated deployment machinery.
- There is a bare minimum of centralized management of these services, which may be written in different programming languages and use different data storage technologies.
- The core idea of a `Microservices Architecture` is to take a complex system and break it down into independent decoupled services that are easy to manage and extend. These services communicate over well defined APIs and are often owned by small self-contained teams.
- `Microservices Architecture` makes applications easy to scale and faster to develop, enabling innovation and accelerating time to market for new features.
- Each `Service` performs a single specific function. And because they are running independently, each `Service` can be updated, deployed and scaled to meet the demands of the application.

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
- For `Table` level operations, we need to instantiate and use `DynamoDB` class from `aws-sdk`:
    ```javascript
        const AWS = require('aws-sdk');
        AWS.config.update({ region: 'ap-south-1' });

        const dynamoDB = new AWS.DynamoDB(); // Instantiating DynamoDB class for table level operations.

        dynamoDB.listTables({}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(JSON.stringify(data, null, 2));
            }
        });
    ```
- For `Item` level operations, we need to instantiate and use `DocumentClient` from `DynamoDB` class from `aws-sdk`:
    ```javascript
        const AWS = require('aws-sdk');
        AWS.config.update({ region: 'ap-south-1' });

        const docClient = new AWS.DynamoDB.DocumentClient(); // Instantiate and use DocumentClient class for Item level operations.

        docClient.put({
            TableName: 'adi_notes_app',
            Item: {
                user_id: 'test123',
                timestamp: 1,
                title: 'Test Note',
                content: 'Test Note Content..'
            }
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(JSON.stringify(data, null, 2));
            }
        });
    ```
- `batchWrite()` method allows us to perform multiple write operations (e.g. Put, Update, Delete) in one go.
- Conditional writes in DynamoDB are `idempotent`. i.e. If we make same conditional write requests multiple times, only the first request will be considered.
- `document.query()` allows us to fetch items from a specific `partition`.
- `document.scan()` allows us to fetch items from all `partitions`.
- **Pagination**:
    * At a time, any `document.query()` or `document.scan()` operation can return maximum `1mb` data in a single request.
    * If our `query/scan` operation has more records to return (after exceeding 1mb limit), we will receive `LastEvaluatedKey` key in the response.
    * `LastEvaluatedKey` is simply an object containing `Index Attribute` of the next item up which the response was returned.
    * In order to retrieve further records, we must pass `LastEvaluatedKey` value under `ExclusiveStartKey` attribute in our subsequent query.
    * If there is no `LastEvaluatedKey` attribute present in DynamoDB query/scan response, it means we have reached the last page of data.
- **DynamoDB Streams:**
    * In simple words, its a `24 Hours Time-ordered Log`.
    * `DynamoDB Streams` maintain a `Time-Ordered Log` of all changes in a given `DynamoDB Table`.
    * This log stores all the `Write Activity` that took place in the last `24 hrs`.
    * Whenever there are any changes made into `DynamoDB Table` and if `DynamoDB Stream` is enabled for that table, these changes will be returned to the `Streams`.
    * There are several ways to consume and process data from `DynamoDB Streams`:
        - We can use `Kinesis Adapter` along with `Kinesis Client Library`. `Kinesis` is platform for processing `High Volume` streaming data on `AWS`.
        - We can also make use of `DynamoDB Streams SDK` to work with `DynamoDB Streams`.
        - `AWS Lambda Triggers` also allows us to work with `DynamoDB Streams`. This approach is much easy and intuitive. `DynamoDB Streams` will invoke `Lambda Functions` based on changes received by them.

----------------------------------------

### AWS Step Functions
- `AWS Step Functions` are the logical progression of `AWS Lambda Functions`.
- With `Step Functions` we can create visual workflows to co-ordinate or orchestrate different `Lambda Functions` to work together.
- A `Step Function` can run upto a maximum period of `1 Year`.
- We can use `Step Functions` to automate routine jobs like deployments, upgrades, migrations, patches and so on.
- **`Step Functions` allows us to combine different `Lambda Functions` to build `Serverless Applications` and `Microservices`.**
- Just like `Lambda Functions`, there is no need to provision any resources or infrastructure to `Step Functions`.
- We simply use `ASL (Amazon Step Language)` to define the workflows. It's a JSON based structured language. We use this language to define various steps as well as different connections and interactions between these steps in `Step Functions`.
- **The resulting workflow is called as the `State Machine`.**
- `State Machine` is displayed in a graphical form just like a flowchart.
- `State Machines` also has built-in error handling mechanisms. We can retry operations based on different errors or conditions.
- Billing is on `Pay as you go` basis. **We only pay for the trasitions between `Steps`.**
- `task` step allows us to invoke `Lambda Function` from our `State Machine`
- `activity` step allows us to run any code on `EC2 Instances`. It is similar to `task` step just that `activity` step is not `Serverless` kind of step.
- Whenever any `Step` in `State Machine` fails, entire `State Machine` fails. Here `Steps` as in `Lambda Functions` or any errors or exceptions received by `Step`.
- We can also use `CloudWatch Rules` to execute a `State Machine`.
- We can use `Lambda Function` to trigger `State Machine Execution`. The advantage of this approach is that `Lambda Functions` support many triggers for their invocation. So we have numerous options to trigger `Lambda Function` and our `Lambda Function` will trigger `State Machine Execution` using `AWS SDK`.
- While building `State Machine` and if it has any `Lambda Functions (task states)`, always specify `TimeoutSeconds` option to make sure our `State Machine` doesn't get stuck or hung.
- In `State Machine`, `catch` field is used to specify `Error Handling Catch Mechanism`.

----------------------------------------

### AWS SAM
- AWS SAM `Serverless Application Model`.
- `AWS SAM` is just a simplified version of `CloudFormation Templates`.
- It seemlessly integrates into `AWS Deployment Tools` like `CodeBuild`, `CodeDeploy`, `CodePipeline` etc.
- It provides `CLI` to build, test and deploy `Serverless Applications`.
- Every `SAM Template` begins with :
    ```yaml
        AWSTemplateFormatVersion: "2010-09-09"
        Transform: AWS::Serverless-2016-10-31
    ```
- To deploy `SAM` application using `CloudFormation Commands` (Instead of using `SAM CLI`):
    * It involves `2 Steps`:
        - Package application and push it to `S3 Bucket`. This step requires `S3 Bucket` to be created in prior to running `CloudFormation Package` command.
        - Deploy packaged application.
    * Step 1: We need an `S3 Bucket` created before we deploy. If we don't have one, then create it using following command:
        ```sh
            aws s3 mb s3://aditya-sam-app
        ```
    * Step 2: Package application:
        ```sh
            aws cloudformation package --template-file template.yaml --output-template-file output-sam-template.yaml --s3-bucket aditya-sam-app
        ```
    * Step 3: Deploy application (Here, we will be using generated output SAM template file):
        ```sh
            aws cloudformation deploy --template-file output-sam-template.yaml --stack-name aditya-sam-app-stack --capabilities CAPABILITY_IAM
        ```
- To generate SAM project boilerplate from sample app:
    ```sh
        sam init --runtime nodejs12.x
    ```
- To execute `Lambda Function` locally with `SAM CLI`:
    ```sh
        # -e to pass event data to Lambda Function. This file must be present in the current location.
        sam local invoke HelloWorldFunction -e events/event.json

        # Alternatively, we can pass event data inline within the command by simply piping it as below. Here we are sending empty event data to Lambda Function.
        echo '{}' | sam local invoke HelloWorldFunction
    ```
- `SAM CLI` also allows to invoke `Lambda Functions` locally from within our application code. To do so, we have to start `Lambda Service` locally using `SAM CLI`:
    ```sh
        sam local start-lambda
    ```
- To run `API Gateway` service locally:
    * Navigate to folder where our `SAM Template` is located (e.g. `template.yaml`).
    * Execute following command to run `API Gateway Service` locally:
        ```sh
            sam local start-api
        ```
- To validate `SAM Template` locally,
    * Navigate to folder where our `SAM Template` is located (e.g. `template.yaml`).
    * Execute following command to validate `SAM Template` locally:
        ```sh
            sam validate
        ```
- To deploy application using `SAM CLI`:
    * It involves `2 Steps`:
        - Package application and push it to `S3 Bucket`. This step requires `S3 Bucket` to be created in prior to running `SAM Package` command.
        - Deploy packaged application.
    * Step 1: We need an `S3 Bucket` created before we deploy. If we don't have one, then create it using following command:
        ```sh
            aws s3 mb s3://aditya-sam-app
        ```
    * Step 2: Package application:
        ```sh
            sam package --template-file template.yaml --output-template-file output-sam-template.yaml --s3-bucket aditya-sam-app
        ```
    * Step 3: Deploy application (Here, we will be using generated output SAM template file):
        ```sh
            sam deploy --template-file output-sam-template.yaml --stack-name aditya-sam-app-stack --capabilities CAPABILITY_IAM
        ```
- To view `Lambda Function` logs using `SAM CLI`:
    ```sh
        sam logs -n LAMBDA_FUNCTION_NAME --stack-name STACK_NAME -- tail

        # For e.g.:
        sam logs -n GetUser --stack-name aditya-sam-app-stack -- tail
    ```

----------------------------------------

### CICD 101
- `AWS CodeCommit`
    * It is a source control service which allows us to host our `Git Based` repositories.
- `AWS CodeBuild`
    * It is a `Continious Integration` service. We can use it to `Package` and **optionally** `Deploy` our applications.
- `AWS CodePipeline`
    * It is a `Continious Delivery` service. It allows us to automate entire `Deployment` and `Release Cycles`.
- **Setup 101**.
    * Initialize `Git Repository` on local machine.
    * **Step #1:** Create `CodeCommit Repository`:
        - Go to `CodeCommit` in `AWS Console` and create new repository.
        - Go to `IAM` in `AWS Console` and create new user. Provide:
            * Only `Programmatic Access`. No need to provide access to `AWS Console`.
            * Attach `Existing Policy`. Look for `CodeCommit` in policies.
            * It will show us `AWS Credentials` for the user. Ignore them.
            * Under `Users`, open that user and go to `Security Credentials`. Scroll down to see `HTTPS Git credentials for AWS CodeCommit`. Click on `Generate` button there.
            * It will show us `Username` and `Password` for this user. Download that.
        - Go to `CodeCommit` console and click on `Connect` button.
        - Copy `Repository URL` from the popup.
        - On our local machine, we need to add `CodeCommit Repository` as `Remote Repository` using following command:
            ```sh
                git remote add origin CODECOMMIT_REPOSITORY_URL
            ```
        - On our local machine, add upstream origin using following command (Repeat this for all local branches):
            ```sh
                # 'origin' refers to the remote repository. i.e. CODECOMMIT_REPOSITORY_URL
                git push --set-upstream origin LOCAL_BRANCH
            ```
        - It will ask for credentials only once. Specify credentials we downloaded from `IAM Console` for our created user.
    * **Step #2:** Setup `CodeBuild`:
         - Go to `CodeBuild` in `AWS Console`.
         - Before we create a `CodeBuild Project`, we will need an `IAM Role` that `CodeBuild` can assume on be our half.
            * For e.g. When we create and deploy our `Serverless Project`, it creates different resouces like `Lambda Functions, APIS, DynamoDB Tables, IAM Roles` in the background using `CloudFormation`. When we deploy from our computer, `AWS Credentials` stored in environment variable of our computer are used. Now the same deployment has to run from a `Containerized Environment` created by `CodeBuild`. So we must provide the same permissions to `CodeBuild` as we provided to the user which connects to AWS while deploying using `Serverless Framework`.
        - Go to `IAM` in `AWS Console` and create new `Role`.
            * Under `Choose the service that will use this role`, select `CodeBuild` and click on `Continue`.
            * Select access (We can choose `Administrator Access`) and click on `Review` and create the `Role`.
            * Now, we can go ahead and create `CodeBuild` project.
        - Go to `CodeBuild` console and create a project.
            * Under `Source Provider`, select `AWS CodeCommit` option. Select `CodeCommit Repository`.
            * Under `Environment: How to build`,
                - Select option `Use an image managed by AWS CodeBuild`.
                - Select `Operating System` as `Ubuntu`.
                - Under `Runtime`, select `Node.js`.
                - Select `Runtime Version`.
                - Under `Build Specifications`, we will use `buildspec.yml` file.
            * Under `Service Role`, select the `Role` we created.
            * Under `Advanced Settings`, create `Environment Variable` as `ENV_NAME = dev`. This way we can build similar project for different environments like `prod, stage` etc..
            * Continue and review the configuration and click on `Save` button. Do not click on `Save and Build` button.
    * **Step #3:** Create a `buildspec.yml` file at root of our project.
        - `buildspec.yml` file tells `CodeBuild` what to do with the sourcecode it downloads from the `CodeCommit Repository`.
        - For e.g.
            ```yml
                # buildspec.yml

                version: 0.2 # Note: Each version can use the different syntax.

                phases: # There are 4 different types of phases we can define here. viz. 'install', 'pre_build', 'build', 'post_build'. Under each phase, we can specify commands for CodeBuild to execute on our be half. If there are any runtime errors while executing commands in particular phase, CodeBuild will not execute the next phase. i.e. If the execution reaches the 'posrt_build' phase, we can be sure that build was successful.
                    - install
                        commands:
                            - echo Installing Serverless.. # This is only for our reference.
                            - npm i -g serverless # Install serverless globally in container.
                    - pre_build
                        commands:
                            - echo Installing NPM dependencies..
                            - npm i # This will install all the dependencies from package.json.
                    - build
                        commands:
                            - echo Deployment started on `date`.. # This will print current date.
                            - echo Deploying with serverless framework..
                            - sls deploy -v -s $ENV_NAME # '$ENV_NAME' is coming from environment variable we setup above.
                    - post_build
                        commands:
                            - echo Deployment completed on `date`..
            ```
        - Commit `buildspec.yml` file and deploy it to `CodeCommit Repository`.
    * **Step #4 (Optional):** If we manually want to build our project,
        - Go to `CodeBuild Console`, select our project and click on `Start Build`.
            * Select the `CodeCommit Branch` that `CodeBuild` should read from.
            * Click on `Start Build` button.
            * It will pull the code from selected branch in `CodeCommit Repository`, and then run the commands we have specified in `buildspec.yml` file.
    * **Step #5:** Setup `CodePipeline`:
        - Go to `CodePipeline` in `AWS Console` and create a new `Pipeline`.
            * `Source location`:
                - Under `Source Provider`, select `AWS CodeCommit`.
                - Select the `Repository` and `Branch Name (Generally master branch)`.
                - We will use `CloudWatch Events` to detect changes. This is the default option. We can change this to make `CodePipeline` periodically check for changes.
                    * By using `CloudWatch Events i.e. default option` under `Change detection options` setting, as soon as we push the change or an update to a `master branch` on `CodeCommit`, this `Pipeline` will get triggered automatically.
                - Click next.
            * `Build`:
                - Under `Build Provider` option, select `AWS CodeBuild`.
                - Under `Configure your project` options, select `Select existing build project` and under `Project name`, select our existing `CodeBuild` project.
                - Click next.
            * `Deploy`:
                - Under `Deployment provider`, since our code deployment will be done through `Serverless Framework` in the `CodeBuild` step and we have defined our `buildspec.yml` file that way, we need to select `No Deployment` option.
                - Click next.
            * `AWS Service Role`:
                - We need to create a necessary `Role` for `Pipeline`. Click on `Create role` button.
                - `AWS` will automatically generate `Policy` with necessary `Permissions` for us. So simply click `Allow` button.
                - Click `Next step` to review the configuration of `Pipeline`.
            * Click on `Create Pipeline` button to create and run this `Pipeline`
    * Now whenever we push changes to `master branch`, our code will get automatically deployed using `CICD`.
    * **Step #6: Production Workflow Setup** - Adding manual approval before production deployment with `CodePipeline`.
        - Once our code gets deployed to `Dev Stage`, it will be ready for testing. And it will trigger a `Manual Approval` request. The approver will approve or reject the change based on the outcome of testing. If the change gets rejected, the `Pipeline` should stop there. Otherwise, if the change is approved, the same code should be pushed to `Production Stage`. Following are the steps to implement this workflow:
        - Go to `CodePipeline` in `AWS Console` and click on `Edit` button for our created `Pipeline`.
        - After `Build Stage` using `CodeBuild`, click on `+ Stage` button to add new stage.
        - Give this new stage a name. e.g. `ApproveForProduction`.
        - Click on `+ Action` to add a new `Action`.
            * Under `Action category` option, select `Approval`.
            * Under `Approval Actions` options:
                - Give an `Action Name`. For e.g. `Approve`.
                - Set `Approval Type` to `Manual Approval` option.
            * Under `Manual approval configuration` options:
                - We need to create an `SNS Topic`.
                    * Go to `SNS Console` under `AWS Console` and click on `Create Topic`.
                    * Specify `Topic Name` and `Display Name`. For e.g. `Topic Name: cicd-production-approval` and `Display Name: CICD Production Approval`.
                    * Click on `Create Topic` button.
                    * Now that the topic has been created, we must `Subscribe` to the topic. Whenever `CodePipeline` triggers the `Manual Approval`, a `Notification` will be triggered to this topic. All the subscribers will be notified by Email for the approval. To setup this:
                    * Click on `Create Subscription` button.
                    * Under `Protocol`, select `Email` option.
                    * Under `Endpoint`, add the email address and click the `Create Subscription` button.'
                    * This will trigger the confirmation. Only after we confirm our email address, the `SNS` will start sending notifications.
                    * `SNS` setup is done at this point. We can head back to `Manual approval configuration` options.
                - Under `SNS Topic ARN`, select the `SNS Topic` we just created above.
                - Under `URL For Review`, we can specify `API URL or Project URL`.
                - Under `Comments`, specify comments if any. For e.g. `Kindly review and approve`.
                - Click on `Add Action` button.
        - After `Manual Approval` stage, click on `+ Action` to add a new `Action` for `Production Build`.
            * Under `Action category` option, select `Build`.
            * Under `Build Actions` options:
                - Give an `Action Name`. For e.g. `CodeBuildProd`.
                - Set `Build Provider` to `AWS CodeBuild` option.
            * Under `Configure your project` options:
                - Select `Create a new build project` option. It will exactly be the same as last one, only difference is it will use different value in `Environment Variables` viz. `Production.`
                - Specify `Project Name`. For e.g. `cicd-production`.
            * Under `Environment: How to build`,
                - Select option `Use an image managed by AWS CodeBuild`.
                - Select `Operating System` as `Ubuntu`.
                - Under `Runtime`, select `Node.js`.
                - Select `Runtime Version`.
                - Under `Build Specifications`, we will use `buildspec.yml` file. i.e. Select option `Use the buildspec.yml in the source code root directory` option.
            * Under `AWS CodeBuild service role` options:
                - Select `Choose an existing service role from your account` option.
                - Under `Role name`, select the existing role we created while setting up `CodeBuild` above.
            * Under `Advanced Settings`, create `Environment Variable` as `ENV_NAME = prod`. This way we can build similar project for different environments like `prod, stage` etc..
            * Click on `Save build project` button.
            * We must provide `Input Artifacts` for this stage. So under `Input Artifacts` options:
                - Set `Input artifacts #1` to `MyApp`.
            * Click on `Add action` button.
        - Click on `Save Pipeline Changes` button. It will popup the confirmation. Click on `Save and continue` button. And we are all set.

----------------------------------------

### Serverless Security Best Practices 101
- `AWS Lambda` uses a decoupled permissions model. It uses 2 types of permissions:
    * `Invoke Permissions`: Requires caller to only have permissions to invoke the `Lambda Function` and no more access is needed.
    * `Execution Permissions`: It is used by `Lambda Function` itself to execute the function code.
- Give each `Lambda Function` it's own `Execution Role`. Avoid using same `Role` across multiple `Lambda Functions`. This is because needs of our `Lambda Functions` may change over time and in that case we may have to alter permissions for `Role` assigned to our functions.
- Avoid setting `Wildcard Permissions` to `Lambda Function Roles`.
- Avoid giving `Full Access` to `Lambda Function Roles`.
- Always provide only the necessary permissions keeping the `Role Policies` as restrictive as possible.
- Choose only the required actions in the `IAM Policy` keeping the policy as restrictive as possible.
- Sometimes `AWS` might add new `Action` on a `Resource` and if our `Policy` is uing a `Wildcard` on the `Actions`, it will automatically receive this additional access to new `Action` even though it may not require it. Hence it's a good and recommended idea to explicitely specify individual `Actions` in the policies and not use `Wildcards`.
- Always make use of `Environment Variables` in `Lambda Functions` to store sensitive data.
- Make use of `KMS (Key Management System) Encryption Service` to encrypt sensitive data stored in `Environment Variables`.
- Make use of `KMS Encryption Service` to encrypt sensitive data `At Rest` and `In Transit`.
- Remember that `Environment Variables` are tied to `Lambda Function Versions`. So it's a good idea to encrypt them before we generate the function version.
- Never log the decrypted values or any sensitive data to console or any persistent storage. Remember that output from `Lambda Functions` is persisted in `CloudWatch Logs`.
- For `Lambda Functions` running inside a `VPC`:
    * Use least privilege security groups.
    * Use `Lambda Function` specific `Subnets` and `Network Configurations` that allows only the `Lambda Functions` to access `VPC Resources`.
- Following are the mechanisms available for controlling the `API Gateway` access:
    * `API Keys` and `Usage Plans`.
    * `Client Certificates`.
    * `CORS Headers`.
    * `API Gateway Resource Policies`.
    * `IAM Policies`.
    * `Lambda Authorizers`.
    * `Cognito User Pool Authorizers`.
    * `Federated Identity Access` using `Cognito`.
- When using `CI/CD Pipelines` for automated deployments, make sure appropriate `Access Control` is in place. For e.g. If pushing code to `master branch` triggers our `Deployment Pipeline`, then we must ensure that only the authorized team members have ability to update the `master branch`.

----------------------------------------

### Best Practices 101 - AWS Lambda
- Keep declarations/instantiations outside `Lambda Handlers`. This allows `Lambda Handlers` to reuse the objects when `Containers` get reused.
- Keep the `Lambda Handlers` lean. i.e. Move the core logic of `Lambda Function` outside of the `Handler Functions`.
- Avoid hardcoding, use `Environment Variables`.
- One function, one task. This is `Microservices Architecture`.
- Watch the deployment package size, remove unused dependencies. Check `package.json`. Certain libraries are available by default on `Lambda Functions`. We can remove those libraries from `package.json`.
- Always keep an eye on `Lambda Logs`. Monitor the `Execution Duration` and `Memory Consumptions`.
- Grant only the necessary `IAM Permissions` to `Lambda Functions`. Although the serverless team recommends using `Admin` user while developing `Serverless Framework Apps`.
- In production, choose to give `API Key` with `PowerUserAccess` at the maximum to `Serverless Framework User`. Avoid giving `AdministratorAccess`.
- Use `-c` flag with `Serverless Framework Deployments`. This will ensure that the commands will only generate `CloudFormation File` and not actually execute it. We can then execute this `CloudFormation File` from within `CloudFormation Console` or as part of our `CI/CD` process.
- If we are creating any temporary files in `/tmp`, make sure to unlink them before we exit out of our handler functions.
- There are restrictions on how many `Lambda Functions` we can create in one AWS account. So make sure to delete unused `Lambda Functions`.
- Always make use of error handling mechanisms and `DLQs`. Put out codes in `Try..Catch` blocks, throw errors wherever needed and handle exceptions. Make use of `Dead Letter Queues (DLQ)` wherever appropriate.
- Use `VPC` only if necessary. For e.g. if our `Lambda Function` need access to `RDS` which is in `VPC` or any `VPC` based resources, then only put our `Lambda Function` in `VPC`. Otherwise there is no need to put `Lambda Function` in `VPC`. `VPCs` are likely to add additional latency to our functions.
- Be mindful of using `Reserved Concurrency`. If we are planning to use `Reserved Concurrency` then make sure that other `Lambda Functions` in our account have enough `concurrency` to work with. This is because every `AWS Account` gets `1000 Concurrent Lambda Executions Across Functions`. So if we reserve concurrency for any function then concurrency limit will reduce by that amount for other functions.
- Keep containers warm so they can be reused. This will reduce the latency introduced by `Cold Starts`. We can easily schedule dummy invocations with `CloudWatch Events` to keep the functions warm.
- Make use of frameworks like `AWS SAM` or `Serverless Framework`.
- Use `CI/CD` tools.

----------------------------------------

### Best Practices 101 - AWS API Gateway
- Keep API definitions as lean as possible. i.e. move all the logic to backend `Lambda Functions`. So unless absolutely necessary we could simply use `Lambda Proxy Integration` where `API Gateway` merely acts as a `Proxy` between `Caller` and a `Lambda Function`. All the data manipulations happen at one place and i.e. inside `Lambda Handler Function`.
- Return useful responses back to the caller instead of returning generic server side errors.
- Enable logging options in `API Gateways` so it is easier to track down failures to their causes. Enable `CloudWatch Logs` for APIs.
- When using `API Gateways` in `Production`, it's recommended to use `Custom Domains` instead of `API Gateway URLs`.
- Deploy APIs closer to our customer's regions.
- Add `Caching` to get additional performance gains.

----------------------------------------

### Best Practices 101 - DynamoDB
- Most important is `Table Design`.
- `DynamoDB Tables` provide the best performance when designed for `Uniformed Data Access`. `DynamoDB` divides the `Provisioned Throughput` equally between all the `Table Partitions` and hence in order to achieve maximum utilization of `Capacity Units`, we must design our `Table Keys` in such a way that `Read and Write Loads` are uniform across `Partitions or Partition Keys`. When `DynamoDB Tables` experience `Non-uniformed Access Patterns`, they will result in what is called as `Hot Partition`. i.e. Some partitions are accessed heavily while others remain idle. When this happens, the `Idle Provisioned Capacity` is wasted while we still have to keep paying for it.
- `DAX (DynamoDB Accelerator)` doesn't come cheap.
- When changing the provisioned throughput for any `DynamoDB Table` i.e. `Scaling Up` or `Scaling Down`, we must avoid `Temporary Substantial Capacity` scaling up. Note: Substantial increases in `Provisioned Capacities` almost always result in `DynamoDB` allocating additional `Partitions`. And when we subsequently scale the capacity down, `DynamoDB` will not de-allocate previously allocated `Partitions`.
- Keep `Item Attribute Names` short. This helps reduce the item size and thereby costs as well.
- If we are to store large values in our items then we must consider compressing the `Non-Key Attributes`. We can use technique like `GZip` for example. Alternatively, we can store large items in `S3` and only pointers to those items are stored in `DynamoDB`.
- `Scan` operations scan the entire table and hence are less efficient than `Query` operations. Thats why, **Avoid `Scan` operations.** Note: `Filters` always gets applied after the `Query` and `Scan` operations are completed.
- Applicable `RCUs` are calculated before applying the `Filters`.
- While performing read operations, go for `Strongly Consistent Reads` only if our application requires it. Otherwise always opt out for `Eventually Consistent Reads`. That saves half the money. Note: Any read operations on `Global Secondary Indexes` are `Eventually Consistent`.
- Use `Local Sendary Indexes (LSIs)` sparingly. LSIs share the same partitions i.e. Same physical space that is used by the `DynamoDB Table`. So adding more LSIs will use more partition size. This doesn't mean we shouldn't use them, but use them as per our application's need.
- When choosing the projections, we can project up to maximum of `20 Attributes per index`. So choose them carefully. i.e. Project as fewer attributes on to secondary indexes as possible. If we just need `Keys` then use only `Keys`, it will produce the smallest `Index`.
- Design `Global Secondary Indexes (GSIs)` for uniform data access.
- Use `Global Secondary Indexes (GSIs)` to create `Eventually Consistent Read Replicas`.

----------------------------------------

### Best Practices 101 - Step Functions
- Always use `Timeouts` in `Task States`.
- Always handle errors with `Retriers` and `Catchers`.
- Use `S3` to store large payloads and pass only the `Payload ARN` between states.

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
- To remove project/function (This will delete the deployed `CloudFormation Stack` with all the resources):
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
- To configure `Lambda Function` to run under `VPC`:
    * We need `Security Group Ids` and `Subnet Ids`, to get them:
        - Under `AWS Console`, go to `VPC`.
        - Go to `Security Groups` and copy `Group ID`. We can copy `default` one. Just one `Security Group Id` is enough though. Specify it under `securityGroupIds`.
        - Go to `Subnets`. Each `AWS Region` has number of `Subnets`. Copy `Subnet ID` and specify them under `subnetIds` option. Although `Serverless` requires `At least 2` subnets, We can copy all the subnets and specify them under `subnetIds` option.
    * Under `serverless.yml` file, set:
        ```yml
            functions:
                hello: # This function is configured to run under VPC.
                    handler: handler.hello
                    vpc:
                        securityGroupIds: # We can specify 1 or more security group ids here.
                            - sg-703jd2847
                        subnetIds: # We must at least provide 2 su1bnet ids.
                            - subnet-qndk392nc2
                            - subnet-dodh28dg2b
                            - subnet-ondn29dnb2
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
