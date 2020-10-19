import DynamoRepository from './';
import { MakePostFromObject, Post } from '../../Domain/Post';
import MakePostId, { GeneratePostId } from '../../Domain/PostId';
import { v4 as uuidv4 } from 'uuid';
import { MakeCrossPostId } from '../../Domain/CrossPostId';
import AWS from 'aws-sdk';
import config from '../../../../App/Config';


describe('DynamoRepository', () => {
    const dynamodb = new AWS.DynamoDB({
        endpoint: 'localhost:8000',
        sslEnabled: false,
        region: 'local-env',
      });

    const repository = DynamoRepository(dynamodb, config('app.postsTable'));

    it ('should persist a post', () => {
        const postId = uuidv4();
        const post = MakePostFromObject({
            id: postId,
            content: 'Go ahead, make my day.',
            images: [],
            type: 'twitter',
            crossPostId: uuidv4(),
        });

        return repository.addPost(post).then(() => {
            return repository.getPost(MakePostId(postId)).then((retrievedPost) => {
                expect(retrievedPost).not.toBeNull();
                expect(retrievedPost.getContent().getValue()).toBe('Go ahead, make my day.');
            });
        });
    });

    it ('should get posts by CrossPostId', () => {
        const CROSS_POST_1 = 'f72de734-eea1-4d04-a9bb-82b1ec4cd3c4';
        const CROSS_POST_2 = '701660fb-a2f2-4903-94de-2296f02eb8bd';

        const POST_ID_1 = uuidv4();
        const POST_ID_2 = uuidv4();
        const POST_ID_3 = uuidv4();

        const post1 = MakePostFromObject({
            id: POST_ID_1,
            content: 'I am serious. And don\'t call me Shirley.',
            images: [],
            type: 'twitter',
            crossPostId: CROSS_POST_1,
        });

        const post2 = MakePostFromObject({
            id: POST_ID_2,
            content: `'Greater good?' I am your wife! I'm the greatest good you're ever gonna get!`,
            images: [],
            type: 'twitter',
            crossPostId: CROSS_POST_1,
        });

        const post3 = MakePostFromObject({
            id: POST_ID_3,
            content: 'That rug really tied the room together, did it not?',
            images: [],
            type: 'twitter',
            crossPostId: CROSS_POST_2,
        });

        const saturate = [
            repository.addPost(post1),
            repository.addPost(post2),
            repository.addPost(post3),
        ];

        return Promise.all(saturate).then(() => {
            return repository.getPostsByCrossPostId(MakeCrossPostId(CROSS_POST_1)).then((posts) => {
                expect(posts).toHaveLength(2);

                posts.map((post: Post) => {
                    expect([POST_ID_1, POST_ID_2]).toContain(post.getId().getValue());
                });
            });
        });
    });

    it ('should return null if the postId does not exist', () => {
        return repository.getPost(MakePostId('nonExistentId')).then((retrievedPost) => {
            expect(retrievedPost).toBeNull();
        });
    });

    it ('should remove a persisted post by id', () => {
        const postId = uuidv4();

        const post = MakePostFromObject({
            id: postId,
            content: `I’ll be back.`,
            images: [],
            type: 'twitter',
            crossPostId: uuidv4(),
        });

        return repository.addPost(post).then(() => {
            return repository.removePost(MakePostId(postId)).then(() => {
                return repository.getPost(MakePostId(postId)).then((retrievedPost) => {
                    expect(retrievedPost).toBeNull();
                });
            });
        });
    });

    it ('should remove many posts by passing an array of PostIds', () => {
        const POST_ID_1 = uuidv4();
        const POST_ID_2 = uuidv4();

        const seed = [POST_ID_1, POST_ID_2];

        return Promise.all(seed.map((postId) => {
            return repository.addPost(MakePostFromObject({
                id: postId,
                content: `The greatest trick the devil ever pulled was convincing the world he didn't exist.`,
                images: [],
                type: 'twitter',
                crossPostId: uuidv4(),
            }));
        })).then(() => {
            return repository.removePost([MakePostId(POST_ID_1), MakePostId(POST_ID_2)]).then(() => {
                return Promise.all([
                    repository.getPost(MakePostId(POST_ID_1)).then((retrievedPost) => {
                        expect(retrievedPost).toBeNull();
                    }),
                    repository.getPost(MakePostId(POST_ID_2)).then((retrievedPost) => {
                        expect(retrievedPost).toBeNull();
                    }),
                ]);
            }); 
        });
    }); 

    it ('should return any post', () => {
        // Add post so there is at least 1 to query
        return repository.addPost(MakePostFromObject({
            id: uuidv4(),
            content: `The greatest teacher, failure is.`,
            images: [],
            type: 'twitter',
            crossPostId: uuidv4(),
        })).then(() => {
            return repository.getNextPost().then((post) => {
                expect(typeof post.getId().getValue()).toBe('string');

                return post.getId();
            });
        }).then((prevPostId) => {
            // remove the last post to make sure we get a different next post
            return repository.removePost(prevPostId).then(() => {
                return repository.getNextPost().then((post) => {
                    if (post) {
                        expect(prevPostId.getValue()).not.toBe(post.getId().getValue())
                    }
                });
            })
        });
    })
});
