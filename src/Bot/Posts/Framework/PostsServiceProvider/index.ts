import { bind, resolve } from '../../../../App/Container';
import DynamoRepository from '../../Infrastructure/DynamoRepository';
import InMemoryRepository from '../../Infrastructure/InMemoryRepository';
import Twitter from '../../Infrastructure/Twitter';
import config from '../../../../App/Config';
import PostRandomToAllNetworks from '../../Application/Commands/PostRandomToAllNetworks';
import GetCrossPostCollection from '../../Application/Queries/GetCrossPostCollection';
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
    registerQueries();
}

const registerCommands = (): void => {
    bind('PostRandomToAllNetworks', () => {
        return PostRandomToAllNetworks(resolve('GetCrossPostCollection'));
    })
}

const registerQueries = () => {
    bind('GetCrossPostCollection', () => {
        return GetCrossPostCollection(resolve('PostsRepository'))
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
