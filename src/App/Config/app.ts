import PostsServiceProvider from '../../Bot/Posts/Framework/PostsServiceProvider';
import env from '../env';

export default {
    providers: [
        PostsServiceProvider,
    ],

    region: env('REGION'),

    postsTable: env('POSTS_TABLE_NAME'),
};
