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
- [Create NodeJS Serverless Service](#create-nodejs-serverless-service)
- [Invoke Lambda Function Locally](#invoke-lambda-function-locally)
- [Serverless Offline](#serverless-offline)
- [NPM Run Serverless Project Locally](#npm-run-serverless-project-locally)

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