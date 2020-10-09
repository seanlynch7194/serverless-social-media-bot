import PostsRepository from '../../Domain/PostsRepository';
import MakePostId, { PostId, PostIdCollection } from '../../Domain/PostId';
import { MakePostFromObject, PostPrimitiveObject } from '../../Domain/Post';
import { Post } from '../../Domain/Post';
import { CrossPostId } from '../../Domain/CrossPostId';
import { promises } from 'fs';

let store: {[key: string]: PostPrimitiveObject} = {};

const InMemoryRepository = (): PostsRepository => {
    return {
        getPost: (postId: PostId) => {
            const post = MakePostFromObject(store[postId.getValue()]);
            return Promise.resolve(post);
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
            if (!store[0]) {
                return Promise.resolve(null);
            }

            return Promise.resolve(MakePostFromObject(store[0]));
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
