import PostsRepository from '../../Domain/PostsRepository';
import MakePostId, { PostId } from '../../Domain/PostId';
import MakePost from '../../Domain/Post';

const DynamoRepository = (): PostsRepository => {
    return {
        getPost: () => {
            const post = MakePost(MakePostId('xxx'), 'Lorem ipsum');
            return Promise.resolve(post);
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
