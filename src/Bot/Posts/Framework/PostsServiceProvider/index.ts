import { bind, resolve } from '../../../../App/Container';
import DynamoRepository from '../../Infrastructure/DynamoRepository';
import InMemoryRepository from '../../Infrastructure/InMemoryRepository';
import Twitter from '../../Infrastructure/Twitter';
import config from '../../../../App/Config';
import PublishNextToAllNetworks from '../../Application/Commands/PublishNextToAllNetworks';
import env from '../../../../App/env';
import SocialNetworks from '../../Domain/SocialNetworks';
import MockSocialNetwork from '../../Infrastructure/MockSocialNetwork';

const PostsServiceProvider = () => {
    bind('PostsRepository', () => {
        if (env('NODE_ENV') === 'local') {
            return InMemoryRepository(); 
        }

        return DynamoRepository();
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
