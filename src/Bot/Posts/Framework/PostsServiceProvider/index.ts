import { bind, resolve } from '../../../../App/Container';
import DynamoRepository from '../../Infrastructure/DynamoRepository';
import Twitter from '../../Infrastructure/Twitter';
import config from '../../../../App/Config';
import PostRandomToAllNetworks from '../../Application/Commands/PostRandomToAllNetworks';

const PostsServiceProvider = () => {
    bind('PostsRepository', () => {
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
}

const registerCommands = (): void => {
    bind('PostRandomToAllNetworks', () => {
        return PostRandomToAllNetworks(resolve('PostsRepository'));
    })
}

export default PostsServiceProvider;
