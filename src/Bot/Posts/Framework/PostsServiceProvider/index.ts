import { bind } from '../../../../App/Container';
import DynamoRepository from '../../Infrastructure/DynamoRepository';

const PostsServiceProvider = () => {
    bind('PostsRepository', () => {
        return DynamoRepository();
    });
}

export default PostsServiceProvider;
