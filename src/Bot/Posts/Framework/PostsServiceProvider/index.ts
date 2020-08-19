import { bind, resolve } from '../../../../App/Container';
import DynamoRepository from '../../Infrastructure/DynamoRepository';
import InMemoryRepository from '../../Infrastructure/InMemoryRepository';
import Twitter from '../../Infrastructure/Twitter';
import config from '../../../../App/Config';
import PostRandomToAllNetworks from '../../Application/Commands/PostRandomToAllNetworks';
import GetCrossPostCollection from '../../Application/Queries/GetCrossPostCollection';
import env from '../../../../App/env';

const PostsServiceProvider = () => {
    bind('PostsRepository', () => {
        if (env('NODE_ENV') === 'local') {
            return InMemoryRepository(); 
        }

        return DynamoRepository();
    });

    bind('Twitter', () => {
        return Twitter({
            consumerKey: config('twitter.consumerKey'),
            consumerSecret: config('twitter.consumerSecret'),
            accessToken: config('twitter.accessToken'),
            accessTokenSecret: config('twitter.accessTokenSecret'),
        });
    });

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

export default PostsServiceProvider;
