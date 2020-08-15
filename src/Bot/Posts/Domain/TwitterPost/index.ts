import MakePostId, { PostId } from '../PostId';
import MakeTwitterPostContent, { TwitterPostContent } from '../TwitterPostContent';
import { PostPrimitiveObject, Post } from '../Post';

export type TwitterPost = Post;

const MakeTwitterPost = (id: PostId, content: TwitterPostContent, images: Array<string>, crossPostId: string): TwitterPost => {
    return {
        getId: () => id,
        getContent: () => content,
        getType: () => 'twitter',
        getImages: () => images,
        getCrossPostId: () => crossPostId,
    }
}

export const MakeTwitterPostFromObject = (data: PostPrimitiveObject): TwitterPost => {
    return MakeTwitterPost(
        MakePostId(data.id), 
        MakeTwitterPostContent(data.content),
        data.images,
        data.crossPostId,
    );
} 

export default MakeTwitterPost;
