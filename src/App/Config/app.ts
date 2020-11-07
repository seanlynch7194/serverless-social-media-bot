import PostsServiceProvider from '../../Bot/Posts/Framework/PostsServiceProvider';
import ErrorTrackerServiceProvider from '../Services/ErrorTracker/Framework/ServiceProvider';
import env from '../env';

export default {
    providers: [
        PostsServiceProvider,
        ErrorTrackerServiceProvider,
    ],

    env: env('APP_ENV'),

    region: env('REGION'),

    postsTable: env('POSTS_TABLE_NAME'),
};
