import InMemoryRepository from './';
import { MakePostFromObject } from '../../Domain/Post';
import MakePostId, { GeneratePostId } from '../../Domain/PostId';
import { v4 as uuidv4 } from 'uuid';
import { MakeCrossPostId } from '../../Domain/CrossPostId';

describe('InMemory Posts Repository', () => {
    it ('should persist a post', () => {
        const repository = InMemoryRepository();
        const postId = uuidv4();

        const post = MakePostFromObject({
            id: postId,
            content: 'People who think they know everything are a great annoyance to those of us who do. - Isaac Asimov',
            images: [],
            type: 'twitter',
            crossPostId: uuidv4(),
        });

        return repository.addPost(post).then(() => {
            return repository.getPost(MakePostId(postId)).then((retrievedPost) => {
                expect(retrievedPost).not.toBeNull();
                expect(retrievedPost.getContent().getValue()).toBe('People who think they know everything are a great annoyance to those of us who do. - Isaac Asimov');
            });
        });
    });

    it ('should get posts by CrossPostId', () => {
        const repository = InMemoryRepository();

        const CROSS_POST_1 = 'f72de734-eea1-4d04-a9bb-82b1ec4cd3c4';
        const CROSS_POST_2 = '701660fb-a2f2-4903-94de-2296f02eb8bd';

        const post1 = MakePostFromObject({
            id: uuidv4(),
            content: 'I am serious. And don\'t call me Shirley.',
            images: [],
            type: 'twitter',
            crossPostId: CROSS_POST_1,
        });

        const post2 = MakePostFromObject({
            id: uuidv4(),
            content: `Greater good?' I am your wife! I'm the greatest good you're ever gonna get!`,
            images: [],
            type: 'twitter',
            crossPostId: CROSS_POST_1,
        });

        const post3 = MakePostFromObject({
            id: uuidv4(),
            content: 'That rug really tied the room together, did it not?',
            images: [],
            type: 'twitter',
            crossPostId: CROSS_POST_2,
        });

        const saturate = [
            repository.addPost(post1),
            repository.addPost(post2),
            repository.addPost(post3),
        ]

        return Promise.all(saturate).then(() => {
            return repository.getPostsByCrossPostId(MakeCrossPostId(CROSS_POST_1)).then((posts) => {
                expect(posts).toHaveLength(2);
            });
        });
    });

    it ('should remove a persisted post by id', () => {
        const repository = InMemoryRepository();
        const postId = uuidv4();

        const post = MakePostFromObject({
            id: postId,
            content: `No, it's a cardigan, but thanks for noticing!`,
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

        const repository = InMemoryRepository({
            [POST_ID_1]: {
                id: POST_ID_1,
                content: `I'm walking here!`,
                images: [],
                type: 'twitter',
                crossPostId: '1234',
            },
            [POST_ID_2]: {
                id: POST_ID_2,
                content: 'Shaken, not stirred.',
                images: [],
                type: 'twitter',
                crossPostId: '4321',
            }
        });

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
