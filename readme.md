# Serverless Social Media Bot

![Tests](https://github.com/seanlynch7194/serverless-social-media-bot/workflows/Tests/badge.svg)

## About
The Serverless Social Media Bot is a production ready serverless application for scheduling Twitter posts. Using Domain Driven Design and Command Query Responsibility Segregation (CQRS) the application is flexible to easily add support for multiple social networks, currently only an adapter for Twitter has been implemented. 

Once deployed a daily cron scedule will trigger the Publisher function which will query DynamoDB for a post and any related cross posts, this allows multiple posts for different social networks to be published at the same time although there is currently only support for Twitter.

One a post has been publsihed it will be hard deleted from DynamoDB.

There is currenly no support for populating the DynamoDB with posts to be scheduled so the database must be manually filled with post data. It's possible that some kind of injest function could be added to this project but that is not on the immediate roadmap.

Using Serverless Framework the the deployment will primarily create a DynamoDB table for storing posts to be published and a Lambda function.

### Prerequisites 
- Serverless CLI - https://www.serverless.com/
- AWS account

## Usage
1. To use this for your own use case clone or fork the repository.
2. Add your environment variables to the GitHub repo using GitHub Secrets
3. If you wish to use Sentry for Error Tracking and also want to use Release Tracking (this lets Sentry associate errors with a specific release) then follow the set up steps for the [Sentry Release GitHub Action](https://github.com/marketplace/actions/sentry-release) 

## Environment 

For local development add all of the required environment varaibles to a `.env` file. Likewise for deploying using GitHub Actions add each of these as GitHub Secrets.

| Name                        | Description                                                                                        |
|-----------------------------|----------------------------------------------------------------------------------------------------|
| NODE_ENV                    | local \| stage \| production                                                                       |
| BOT_NAME                    | Used to name resources created, should be unique across AWS account.                               |
| REGION                      | Region that the application is deployed in.                                                        |
| POSTS_TABLE_NAME            | DynamoDB table name. To keep it unique I recommend you prefix the table with the bot name as well. |
| TWITTER_CONSUMER_KEY        |                                                                                                    |
| TWITTER_CONSUMER_SECRET     |                                                                                                    |
| TWITTER_ACCESS_TOKEN        |                                                                                                    |
| TWITTER_ACCESS_TOKEN_SECRET |                                                                                                    |
| SENTRY_DSN                  |                                                                                                    |

**AWS Access Key**  
To deploy using Serverless Framework you will need to add the AWS access key and secret for your AWS account as a GitHub Secret `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`.

**Sentry Release Tracking**  
If you are using Sentry Release Tracking you will also need secrets for `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT`. If you do not want to use Release Tracking then remove the "Create Sentry release" step from the `deploy` workflow.

## Deploy Pipeline

Using GitHub Actions the `deploy` workflow on merge to `master` will build the Typescript project, run Jest tests, and deploy using Serverless. 

All the required environment variables should be added as GitHub Secrets.

## Changing The Schedule
The Publisher Lambda function will be invoked once a day, you can change the rate in `serverless.yml`.

## Build
Application is written in Typescript to compile into plain Javascript use the build command

```bash
npm run build
```

## Tests
Tests are written using Jest, run unit tests using the test command.

```bash
npm run test
```

**Coverage**  
Generate a code coverage report

```bash
npm run coverage
```
