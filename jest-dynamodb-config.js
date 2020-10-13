/**
 * @see https://jestjs.io/docs/en/dynamodb#use-jest-dynamodb-preset
 */
module.exports = {
    tables: [
        {
            TableName: `Local-Posts`,
            KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
            AttributeDefinitions: [{
                AttributeName: 'id', AttributeType: 'S'
            }, {
                AttributeName: 'crossPostId', AttributeType: 'S'
            }],
            GlobalSecondaryIndexes: [{
                IndexName: 'crossPostId',
                KeySchema: [{
                    AttributeName: 'crossPostId',
                    KeyType: 'HASH'
                }],
                Projection: {
                    ProjectionType: 'ALL'
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                },
            }],
            ProvisionedThroughput: { 
                ReadCapacityUnits: 1, 
                WriteCapacityUnits: 1
            },
        },
    ],
    port: 8000,
};
