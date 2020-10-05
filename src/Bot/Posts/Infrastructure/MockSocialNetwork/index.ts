import { SocialNetwork } from '../../Domain/SocialNetwork';
import { Post } from '../../Domain/Post';

export default (): SocialNetwork => {
    return {
        publish: (post: Post) => {
            console.log(`Published post: ${post.getId()}`);
            return Promise.resolve();
        },

        testConnection: () => {
            console.log('testing social network connection');
            return Promise.resolve();
        }
    }
}   