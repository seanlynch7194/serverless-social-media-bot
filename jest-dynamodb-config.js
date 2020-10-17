/**
 * @see https://jestjs.io/docs/en/dynamodb#use-jest-dynamodb-preset
 */
module.exports = async () => {

    /**
     * @see https://github.com/shelfio/jest-dynamodb#22-examples
     */
    const serverless = new (require('serverless'))();
    
    await serverless.init();
    const service = await serverless.variables.populateService({
        region: 'eu-west-1',
        env: 'local',
    });

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
