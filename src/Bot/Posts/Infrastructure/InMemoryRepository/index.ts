import PostsRepository from '../../Domain/PostsRepository';
import MakePostId, { PostId, PostIdCollection } from '../../Domain/PostId';
import { MakePostFromObject, PostPrimitiveObject } from '../../Domain/Post';
import { Post } from '../../Domain/Post';
import { CrossPostId } from '../../Domain/CrossPostId';

const InMemoryRepository = (initialState = {}): PostsRepository => {

    let store: {[key: string]: PostPrimitiveObject} = initialState;

    return {
        getPost: (postId: PostId) => {
            const entry = store[postId.getValue()];

            if (!entry) {
                return Promise.resolve(null);
            }
            
            return Promise.resolve(MakePostFromObject(entry));
        },

        getPostsByCrossPostId: (crossPostId: CrossPostId) => {
            const postsByCrossPostId = Object.values(store).filter((post: PostPrimitiveObject) => {
                return post.crossPostId === crossPostId.getValue();
            });

            return Promise.resolve(postsByCrossPostId.map((post: PostPrimitiveObject) => {
                return MakePostFromObject(post);
            }));
        },

        getNextPost: () => {
            const keys = Object.keys(store);

            if (keys.length === 0) {
                return Promise.resolve(null);
            }

            return Promise.resolve(MakePostFromObject(store[keys[0]]));
        },

        addPost: (post: Post) => {
            store[post.getId().getValue()] = post.toObject();
            return Promise.resolve();
        },

        removePost: (postIdCollection: PostIdCollection): Promise<void> => {
            const purge = (id: PostId) => delete store[id.getValue()];
            
            if (Array.isArray(postIdCollection)) {
                postIdCollection.map(purge);
                return Promise.resolve();
            } 

            purge(postIdCollection);

            return Promise.resolve();
        }
    }
}

export default InMemoryRepository;
