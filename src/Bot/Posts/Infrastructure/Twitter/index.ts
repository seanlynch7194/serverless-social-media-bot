import { SocialNetwork } from '../../Domain/SocialNetwork';
import { TwitterPost } from '../../Domain/TwitterPost';
import TwitterClient from 'twitter-lite';

type TwitterConfig = {
    consumerKey: string,
    consumerSecret: string,
    accessToken: string,
    accessTokenSecret: string,
};

const Twitter = (config: TwitterConfig): SocialNetwork => {
    console.log('running twitter');

    const client = new TwitterClient({
        consumer_key: config.consumerKey,
        consumer_secret: config.consumerSecret,
        access_token_key: config.accessToken,
        access_token_secret: config.accessTokenSecret,
    });
      
    return {
        publish: (post: TwitterPost) => {
            return client.post('statuses/update', {
                status: post.getContent().getValue(),
            }).then((response) => {
                return;
            });
        },
    };
}

export default Twitter;
