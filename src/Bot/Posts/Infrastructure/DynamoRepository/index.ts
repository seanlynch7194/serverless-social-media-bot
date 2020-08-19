import PostsRepository from '../../Domain/PostsRepository';
import MakePostId, { PostId } from '../../Domain/PostId';
import { MakeTwitterPostFromObject } from '../../Domain/TwitterPost';

const DynamoRepository = (): PostsRepository => {
    return {
        getPost: () => {
            const post = MakeTwitterPostFromObject({
                id: 'xxx', 
                content: 'Lorem ipsum',
                type: 'twitter',
                images: [],
                crossPostId: '',
            });
            return Promise.resolve(post);
        },

        getCrossPostBatch: () => {
            return Promise.resolve([]);
        },

        addPost: () => {
            return Promise.resolve();
        },

        removePost: (id: PostId): Promise<void> => {
            return Promise.resolve();
        }
    }
}

export default DynamoRepository;
