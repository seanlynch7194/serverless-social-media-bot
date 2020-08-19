import MakePostId, { PostId } from '../PostId';
import MakeTwitterPostContent, { TwitterPostContent } from '../TwitterPostContent';
import { PostPrimitiveObject, Post } from '../Post';
import { CrossPostId, MakeCrossPostId } from '../CrossPostId';

export type TwitterPost = Post;

const MakeTwitterPost = (id: PostId, content: TwitterPostContent, images: Array<string>, crossPostId: CrossPostId): TwitterPost => {
    return {
        getId: () => id,
        getContent: () => content,
        getType: () => 'twitter',
        getImages: () => images,
        getCrossPostId: () => crossPostId,
        toObject: () => {
            return {
                id: id.getValue(),
                content: content.getValue(),
                type: 'twitter',
                images: images,
                crossPostId: crossPostId.getValue(),
            };
        }
    }
}

export const MakeTwitterPostFromObject = (data: PostPrimitiveObject): TwitterPost => {
    return MakeTwitterPost(
        MakePostId(data.id), 
        MakeTwitterPostContent(data.content),
        data.images,
        MakeCrossPostId(data.crossPostId),
    );
} 

export default MakeTwitterPost;
