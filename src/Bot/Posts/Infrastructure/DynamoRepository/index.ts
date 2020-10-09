import PostsRepository from '../../Domain/PostsRepository';
import MakePostId, { PostId, PostIdCollection } from '../../Domain/PostId';
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

        addPost: () => {
            return Promise.resolve();
        },

        removePost: (postIds: PostIdCollection): Promise<void> => {
            return Promise.resolve();
        }
    }
}

export default DynamoRepository;
