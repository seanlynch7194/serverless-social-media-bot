import { Post } from "../Post";
import { PostId, PostIdCollection } from "../PostId";
import { CrossPostId } from "../CrossPostId";



type PostsRepository = {
    /**
     * Get a random post
     */
    getPost: (postId: PostId) => Promise<Post | null>,

    getNextPost: () => Promise<Post | null>,

    getPostsByCrossPostId: (crossPostId: CrossPostId) => Promise<Array<Post>>

    /**
     * Store new post
     */
    addPost: (post: Post) => Promise<void>,

    /**
     * Remove post by id from repository
     */
    removePost: (postIds: PostIdCollection) => Promise<void>
}

export default PostsRepository;
