import PostsRepository from '../../Domain/PostsRepository';
import MakePostId, { PostId, PostIdCollection, GeneratePostId } from '../../Domain/PostId';
import { MakePostFromObject } from '../../Domain/Post';
import AWS from 'aws-sdk';
import { Post } from '../../Domain/Post';
import { CrossPostId } from '../../Domain/CrossPostId';
import chunk from '../../../../App/Helpers/chunk';


/**
 * 
 * @param dynamoDb {AWS.DynamoDB}
 * @param postsTable {string} DynamoDb table name for storing posts
 */
const DynamoRepository = (dynamoDb: AWS.DynamoDB, postsTable: string): PostsRepository => {
    return {
        /**
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#getItem-property
         */
        getPost: (postId: PostId) => {
            return new Promise((resolve, reject) => {

                const params: AWS.DynamoDB.GetItemInput = {
                    Key: {
                        'id': {
                            S: postId.getValue(),
                        },
                    },
                    TableName: postsTable,
                };
                
                dynamoDb.getItem(params, function (err, postData) {
                    if (err) { 
                        return reject(err);
                    }

                    if (!postData.Item) {
                        return resolve(null);
                    }

                    const post = MakePostFromObject({
                        id: postData.Item.id.S as string,
                        content: postData.Item.content.S as string,
                        type: postData.Item.type.S as 'twitter',
                        images: JSON.parse(postData.Item.images.S as string),
                        crossPostId: postData.Item.crossPostId.S as string,
                    });
                    
                    return resolve(post);
                });
            });
        },

        /**
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property
         */
        getPostsByCrossPostId: (crossPostId: CrossPostId): Promise<Array<Post>> => {
            return new Promise((resolve, reject) => {
                const params = {
                    ExpressionAttributeValues: {
                        ":v1": {
                            S: crossPostId.getValue(),
                        }
                    },
                    KeyConditionExpression: "crossPostId = :v1",
                    IndexName: 'crossPostId',
                    TableName: postsTable,
                };

                dynamoDb.query(params, function (err, posts) {
                    if (err) { 
                        console.log(err, err.stack); // an error occurred
                        return reject(err);
                    }

                    if (!posts.Items) {
                        return resolve([]);
                    }

                    return resolve(posts.Items.map((postData) => {
                        return MakePostFromObject({
                            id: postData.id.S as string,
                            content: postData.content.S as string,
                            type: postData.type.S as 'twitter',
                            images: JSON.parse(postData.images.S as string),
                            crossPostId: postData.crossPostId.S as string,
                        });
                    }));
                });
            });
        },

        getNextPost: () => {
            return new Promise((resolve, reject) => {
                const params = {
                    TableName: postsTable,
                    Limit : 1,
                }

                dynamoDb.scan(params, function (err, postData) {
                    if (err) { 
                        console.log(err, err.stack); // an error occurred
                        return reject(err);
                    }

                    if (!postData.Items || postData.Items.length === 0) {
                        return resolve(null);
                    }

                    return resolve(MakePostFromObject({
                        id: postData.Items[0].id.S as string,
                        content: postData.Items[0].content.S as string,
                        type: postData.Items[0].type.S as 'twitter',
                        images: JSON.parse(postData.Items[0].images.S as string),
                        crossPostId: postData.Items[0].crossPostId.S as string,
                    }));
                });
            });
        },

        /**
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property
         */
        addPost: (post: Post) => {
            return new Promise((resolve, reject) => {
                const params: AWS.DynamoDB.PutItemInput = {
                    Item: {
                        'id': {
                            S: post.getId().getValue(),
                        },
                        'content': {
                            S: post.getContent().getValue(),
                        },
                        'images': {
                            S: JSON.stringify(post.getImages()),
                        },
                        'type': {
                            S: post.getType(),
                        },
                        'crossPostId': {
                            S: post.getCrossPostId().getValue(),
                        }
                    },
                    TableName: postsTable,
                };

                dynamoDb.putItem(params, function (err, data) {
                    if (err) { 
                        console.log(err, err.stack); // an error occurred
                        return reject(err);
                    }
                    
                    return resolve();
                });
            });
        },
        
        /**
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteItem-property
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchWriteItem-property
         */
        removePost: (postIds: PostIdCollection): Promise<void> => {

            // Dynamo only allows 25 items in a batch write
            const chunkInto25 = (arr: Array<PostId>): Array<Array<PostId>> => chunk(arr, 25);
            const postIdBatches = Array.isArray(postIds) ? chunkInto25(postIds) : chunkInto25([postIds]);

            return Promise.all(postIdBatches.map((batch) => {
                return new Promise((resolve, reject) => {
                    const params = {
                        RequestItems: {
                            [postsTable]: batch.map((postId) => {
                                return {
                                    DeleteRequest: {
                                        Key: {
                                            'id': {
                                                S: postId.getValue(),
                                            }, 
                                        },
                                    },
                                }
                            }),
                        }
                    };
    
                    dynamoDb.batchWriteItem(params, function (err, data) {
                        if (err) { 
                            console.log(err, err.stack); // an error occurred
                            return reject(err);
                        }
                        
                        resolve();
                    });
                });
            })).then((batchResults) => {
                return;
            }) 
        }
    }
}

export default DynamoRepository;
