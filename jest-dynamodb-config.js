/**
 * @see https://jestjs.io/docs/en/dynamodb#use-jest-dynamodb-preset
 */
module.exports = async () => {
    const dotEnvVariables = require('dotenv').config();

    console.log('dotEnvVariables', dotEnvVariables);

    /**
     * @see https://github.com/shelfio/jest-dynamodb#22-examples
     */
    const serverless = new (require('serverless'))();
    
    await serverless.init();
    serverless.service.provider.environment = Object.assign({}, serverless.service.provider.environment, dotEnvVariables.parsed);
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
