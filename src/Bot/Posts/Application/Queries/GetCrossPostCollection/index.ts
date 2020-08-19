import { Post } from '../../../Domain/Post';
import PostsRepository from '../../../Domain/PostsRepository';

const GetCrossPostCollection = async (posts: PostsRepository): Promise<Array<Post>> => {
    const randomPost = await posts.getRandomPost();
    const crossPosts = await posts.getCrossPostBatch(randomPost.getCrossPostId());

    return Promise.resolve(crossPosts);
}

export default GetCrossPostCollection;
