/**
 * @see https://jestjs.io/docs/en/dynamodb#use-jest-dynamodb-preset
 */
module.exports = async () => {
    const environmentVariables = getEnvs();

    console.log('environmentVariables', environmentVariables);

    /**
     * @see https://github.com/shelfio/jest-dynamodb#22-examples
     */
    const serverless = new (require('serverless'))();
    
    await serverless.init();
    serverless.service.provider.environment = Object.keys(serverless.service.provider.environment).map((key) => {
        return environmentVariables[key];
    });
    const service = await serverless.variables.populateService({
        region: 'eu-west-1',
        env: 'local',
    });

    console.log('serverless.service.provider.environment', serverless.service.provider.environment);

    const resources = service.resources.Resources;
  
    const tables = Object.keys(resources)
        .map(name => resources[name])
        .filter(r => r.Type === 'AWS::DynamoDB::Table')
        .map(r => r.Properties);
  
    return {
        tables,
        port: 8000
    }
};

const getEnvs = () => {
    if (process.env.NODE_ENV === 'local') {
        return require('dotenv').config().parsed;
    } else {
        return process.env;
    }
}
