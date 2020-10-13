import PostsRepository from '../../Domain/PostsRepository';
import MakePostId, { PostId, PostIdCollection } from '../../Domain/PostId';
import { MakeTwitterPostFromObject } from '../../Domain/TwitterPost';
import AWS from 'aws-sdk';
import { Post } from '../../Domain/Post';

const DynamoRepository = (dynamoDb: AWS.DynamoDB, PostsTable: string): PostsRepository => {
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
                    TableName: PostsTable,
                };
                
                dynamoDb.getItem(params, function (err, postData) {
                    if (err || !postData.Item) { 
                        console.log(err, err.stack); // an error occurred
                        return reject(err);
                    }

                    const hasMissingProperties = [
                        postData.Item.id.S,
                        postData.Item.content.S,
                        postData.Item.type.S,
                        postData.Item.images.S,
                        postData.Item.crossPostId.S,
                    ].some((prop) => {
                        if (!prop) return true;
                        return false;
                    });

                    if (hasMissingProperties) {
                        return reject(new Error());
                    }

                    const post = MakeTwitterPostFromObject({
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

        getPostsByCrossPostId: () => {
            return Promise.resolve([]);
        },

        getNextPost: () => {
            const post = MakeTwitterPostFromObject({
                id: 'xxx', 
                content: 'Lorem ipsum',
                type: 'twitter',
                images: [],
                crossPostId: '',
            });
            return Promise.resolve(post);
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
                    // ReturnConsumedCapacity: "TOTAL",
                    TableName: PostsTable,
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

        removePost: (postIds: PostIdCollection): Promise<void> => {
            return Promise.resolve();
        }
    }
}

export default DynamoRepository;
