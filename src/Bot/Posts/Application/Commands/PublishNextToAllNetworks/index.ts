import PostsRepository from '../../../Domain/PostsRepository';
import { Post } from '../../../Domain/Post';
import { SocialNetwork } from '../../../Domain/SocialNetwork';
import { PostId } from '../../../Domain/PostId';
import ErrorTracker from '../../../../../App/Services/ErrorTracker/Domain/ErrorTracker';


const PublishNextToAllNetworks = (
    postsRepository: PostsRepository, 
    socialNetworks: SocialNetwork,
    errorTracker: ErrorTracker
) => {
    return async () => {
        const nextPost = await postsRepository.getNextPost();
        if (!nextPost) {
            console.log('No posts to publish');
            return Promise.resolve();
        }

        const posts = await postsRepository.getPostsByCrossPostId(nextPost.getCrossPostId());

        errorTracker.setContext('nextPosts', {
            nextPostId: nextPost.getId().getValue(),
            posts: JSON.stringify(posts.map((post) => post.toObject())),
        });

        return Promise.all(posts.map((post: Post) => {
            return socialNetworks.publish(post).then(() => {
                return post.getId();
            });
        })).then((postIds: Array<PostId>) => {
            return postsRepository.removePost(postIds)
        });
    }
}

export default PublishNextToAllNetworks;
