import { Post } from "../Post";
import { PostId } from "../PostId";

type PostsRepository = {
    /**
     * Get a random post
     */
    getPost: () => Promise<Post>,

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
