import InvalidPostId from '../Exceptions/InvalidPostId';
import { v4 as uuidv4 } from 'uuid';

export type PostId = {
    getValue: () => string
}

export type PostIdCollection = PostId | Array<PostId>;

/**
 * Make PostId value object
 * 
 * @param id {string}
 */
const MakePostId = (id: string): PostId => {
    if (id.length > 255) {
        throw InvalidPostId.tooLong();
    }

    if (id.length <= 0) {
        throw InvalidPostId.tooShort();
    }

    return {
        getValue: (): string => id,
    }
}

/**
 * Generate new PostId from new uuid
 * 
 * @return {PostId}
 */
export const GeneratePostId = (): PostId => {
    return MakePostId(uuidv4());
}

export default MakePostId;
