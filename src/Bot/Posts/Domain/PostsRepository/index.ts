import { Post } from "../Post";
import { PostId } from "../PostId";
import { CrossPostId } from "../CrossPostId";

type PostsRepository = {
    /**
     * Get a random post
     */
    getPost: (postId: PostId) => Promise<Post>,

    getRandomPost: () => Promise<Post>,

    getCrossPostBatch: (crossPostId: CrossPostId) => Promise<Array<Post>>

    /**
     * Store new post
     */
    addPost: (post: Post) => Promise<void>,

    /**
     * Remove post by id from repository
     */
    removePost: (postId: PostId) => Promise<void>
}

export default PostsRepository;
