import { bind, resolve } from '../../../../App/Container';
import DynamoRepository from '../../Infrastructure/DynamoRepository';
import InMemoryRepository from '../../Infrastructure/InMemoryRepository';
import Twitter from '../../Infrastructure/Twitter';
import config from '../../../../App/Config';
import PublishNextToAllNetworks from '../../Application/Commands/PublishNextToAllNetworks';
import env from '../../../../App/env';
import SocialNetworks from '../../Domain/SocialNetworks';
import MockSocialNetwork from '../../Infrastructure/MockSocialNetwork';
import PostsRepository from '../../Domain/PostsRepository';
import AWS from 'aws-sdk';

const PostsServiceProvider = () => {
    bind('PostsRepository', (): PostsRepository => {
        if (env('NODE_ENV') === 'local') {
            return InMemoryRepository(); 
        }

        /**
         * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
         */
        const dynamodb = new AWS.DynamoDB({
            accessKeyId: config('aws.access_key_id'),
            secretAccessKey: config('aws.secret_access_key'),
        });

        return DynamoRepository(dynamodb, config('app.postsTable'));
    });

    registerSocialNetworks();
    registerCommands();
}

const registerCommands = (): void => {
    bind('PublishNextToAllNetworks', () => {
        return PublishNextToAllNetworks(resolve('PostsRepository'), resolve('socialNetworks'));
    })
}

/**
 * Register Social Network wrapper that will proxy many
 * social networks through a single api.
 *  
 */
const registerSocialNetworks = () => {
    bind('socialNetworks', () => {
        if (env('NODE_ENV') === 'local') {
            return SocialNetworks([MockSocialNetwork()]);
        }

        return SocialNetworks([resolve('Twitter')]);
    });

    bind('Twitter', () => {
        return Twitter({
            consumerKey: config('twitter.consumerKey'),
            consumerSecret: config('twitter.consumerSecret'),
            accessToken: config('twitter.accessToken'),
            accessTokenSecret: config('twitter.accessTokenSecret'),
        });
    });
}

export default PostsServiceProvider;
