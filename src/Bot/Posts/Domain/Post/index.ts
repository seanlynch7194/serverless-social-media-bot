import { TwitterPost, MakeTwitterPostFromObject } from '../TwitterPost';
import { PostId } from '../PostId';
import { PostContent } from '../PostContent';
import { CrossPostId } from '../CrossPostId';
import InvalidPostType from '../Exceptions/InvalidPostType';


export type Post =  {
    getId: () => PostId,
    getContent: () => PostContent,
    getType: () => 'twitter',
    getImages: () => Array<string>,
    getCrossPostId: () => CrossPostId,
    toObject: () => PostPrimitiveObject,
};

export type PostPrimitiveObject = {
    id: string,
    content: string,
    images: Array<string>,
    type: 'twitter',
    crossPostId: string,
};

export const MakePostFromObject = (postData: PostPrimitiveObject): Post => {
    if (postData.type === 'twitter') {
        return MakeTwitterPostFromObject(postData);
    }

    throw InvalidPostType.fromType(postData.type);
}
