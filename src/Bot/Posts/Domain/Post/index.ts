import { PostId } from "../PostId";

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

export default MakePost;
