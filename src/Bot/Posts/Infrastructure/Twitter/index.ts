import { SocialNetwork } from '../../Domain/SocialNetwork';
import { Post } from '../../Domain/Post';
import { TwitterPost } from '../../Domain/TwitterPost';

const Twitter = (): SocialNetwork => {

    return {
        publish: (post: TwitterPost) => {
            return Promise.resolve();
        }
    };
}

export default Twitter;
