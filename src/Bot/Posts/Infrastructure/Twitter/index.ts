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
            return Promise.resolve();
        },

        testConnection: () => {
            console.log('testing connections');
            return client
                .get("account/verify_credentials")
                .then(results => {
                    console.log("results", results);
                })
                .catch((err) => {
                    console.log('error');
                    console.error(err);
                });
        }
    };
}

export default Twitter;
