import MakePostId, { PostId } from '../PostId';

export type Post = {
    getId: () => PostId,
    getContent: () => string,
}

const MakePost = (id: PostId, content: string): Post => {
    return {
        getId: () => id,
        getContent: () => content,
    }
}

type PostPrimitiveObject = {
    id: string,
    content: string,
};

export const MakePostFromObject = (data: PostPrimitiveObject): Post => {
    return MakePost(MakePostId(data.id), data.content);
} 

export default MakePost;
