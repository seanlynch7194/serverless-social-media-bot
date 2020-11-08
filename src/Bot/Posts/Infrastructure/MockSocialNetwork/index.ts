import { SocialNetwork } from '../../Domain/SocialNetwork';
import { Post } from '../../Domain/Post';

export default (): SocialNetwork => {
    return {
        publish: (post: Post) => {
            console.log(`Published post: ${post.getId().getValue()}`);
            return Promise.resolve();
        },
    }
}   