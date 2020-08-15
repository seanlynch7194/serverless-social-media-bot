import env from '../env';

export default {
    consumerKey: env('TWITTER_CONSUMER_KEY'),
    consumerSecret: env('TWITTER_CONSUMER_SECRET'),
    accessToken: env('TWITTER_ACCESS_TOKEN'),
    accessTokenSecret: env('TWITTER_ACCESS_TOKEN_SECRET'),
};
