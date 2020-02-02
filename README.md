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
- [Installing Serverless](#installing-serverless)
- [Configuring AWS Credentials For Serverless](#configuring-aws-credentials-for-serverless)
- [Create NodeJS Serverless Service](#create-nodejs-serverless-service)
- [Invoke Lambda Function Locally](#invoke-lambda-function-locally)
- [Serverless Offline](#serverless-offline)
- [NPM Run Serverless Project Locally](#npm-run-serverless-project-locally)
- [Deploy Serverless Service](#deploy-serverless-service)
- [Common Issues](#common-issues)

## License
Open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

### Installing Serverless
- To install `Serverless` globally:
    ```
        sudo npm i -g serverless
    ```
- For automatic updates, after above command, run:
    ```
        sudo chown -R $USER:$(id -gn $USER) /Users/adiinviter/.config
    ```

### Configuring AWS Credentials For Serverless
- To configure aws user credentials, run:
    ```
        // -o: To overwrite existing credentials if there are any set already.
        sls config credentials --provider aws --key [ACCESS_KEY] --secret [SECRET_KEY] -o
    ```
- After running above command, credentials will get set under following path:
    ```
        ~/.aws/credentials
    ```

### Create NodeJS Serverless Service
- Each service is a combination of multiple `Lambda Functions`.
- To create `NodeJS Serverless Service`:
    ```
        sls create --t aws-nodejs
    ```

### Invoke Lambda Function Locally
- To invoke a `Lambda Function` locally:
    ```
        // Syntax
        sls invoke local -f [FUNCTION_NAME]

        // Example
        sls invoke local -f myfunct
    ```

### Serverless Offline
- For **local development only**, use `Serverless Offline` plugin.
- Plugin:
    ```
        https://www.npmjs.com/package/serverless-offline
        https://github.com/dherault/serverless-offline
    ```
- To install:
    ```
        npm i serverless-offline --save-dev
    ````

### NPM Run Serverless Project Locally
- Install [Serverless Offline](#serverless-offline) plugin.
- User `serverless.yml`, add:
    ```
        plugins:
            - serverless-offline
    ```
- Under `package.json`, add new run script:
    ```
        "dev": "sls offline start --port 3000"
    ```
- Run:
    ```
        npm run dev
    ```

### Deploy Serverless Service
- To deploy serverless service, run:
    ```
        // -v: For verbose.
        sls deploy -v
    ```

### Common Issues
- After running `sls deploy -v`, error: **`The specified bucket does not exist`**:
    * **Cause:** This issue occurs when we manually delete S3 bucket from AWS console.
    * **Fix:** Login to AWS console and delete stack from `CloudFormation`.
    * **Full Error Sample:**
    ```
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