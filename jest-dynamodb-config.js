/**
 * @see https://jestjs.io/docs/en/dynamodb#use-jest-dynamodb-preset
 */
module.exports = {
    tables: [
        {
            TableName: `Local-Posts`,
            KeySchema: [{ AttributeName: 'Id', KeyType: 'HASH' }],
            AttributeDefinitions: [{
                AttributeName: 'Id', AttributeType: 'S'
            }],
            ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
        },
        // etc
    ],
    port: 8011,
};
