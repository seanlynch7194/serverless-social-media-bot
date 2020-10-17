import PostsServiceProvider from '../../Bot/Posts/Framework/PostsServiceProvider';
import env from '../env';

export default {
    providers: [
        PostsServiceProvider,
    ],

    postsTable: env('POSTS_TABLE_NAME'),
};
