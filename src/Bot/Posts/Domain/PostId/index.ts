import InvalidPostId from '../Exceptions/InvalidPostId';

export type PostId = {
    getValue: () => string
}

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

export default MakePostId;
