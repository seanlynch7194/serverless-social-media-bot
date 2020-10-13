import DynamoRepository from './';
import { MakePostFromObject } from '../../Domain/Post';
import MakePostId, { GeneratePostId } from '../../Domain/PostId';
import { v4 as uuidv4 } from 'uuid';
import { MakeCrossPostId } from '../../Domain/CrossPostId';
import AWS from 'aws-sdk';

describe('DynamoRepository', () => {
    const dynamodb = new AWS.DynamoDB({
        endpoint: 'localhost:8000',
        sslEnabled: false,
        region: 'local-env',
      });

    const repository = DynamoRepository(dynamodb, 'Local-Posts');

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
});