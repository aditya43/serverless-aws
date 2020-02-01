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
- To create `NodeJS Serverless Service`:
    ```
    sls create --t aws-nodejs
    ```