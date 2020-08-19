import PostsRepository from '../../Domain/PostsRepository';
import MakePostId, { PostId } from '../../Domain/PostId';
import { MakePostFromObject, PostPrimitiveObject } from '../../Domain/Post';
import { Post } from '../../Domain/Post';
import { CrossPostId } from '../../Domain/CrossPostId';

let store: {[key: string]: PostPrimitiveObject} = {};

const InMemoryRepository = (): PostsRepository => {
    return {
        getPost: (postId: PostId) => {
            const post = MakePostFromObject(store[postId.getValue()]);
            return Promise.resolve(post);
        },

        getCrossPostBatch: (crossPostId: CrossPostId) => {
            const postsByCrossPostId = Object.values(store).filter((post: PostPrimitiveObject) => {
                return post.crossPostId === crossPostId.getValue();
            });

            return Promise.resolve(postsByCrossPostId.map((post: PostPrimitiveObject) => {
                return MakePostFromObject(post);
            }));
        },

        addPost: (post: Post) => {
            store[post.getId().getValue()] = post.toObject();
            return Promise.resolve();
        },

        removePost: (id: PostId): Promise<void> => {
            delete store[id.getValue()];
            return Promise.resolve();
        }
    }
}

export default InMemoryRepository;
