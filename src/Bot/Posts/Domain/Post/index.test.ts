import InvalidPostType from '../Exceptions/InvalidPostType';
import { v4 as uuidv4 } from 'uuid';
import { MakePostFromObject } from './';

describe('post', () => {
    it('should throw an error if an unsupported post type is passed in', () => {

        expect(() => {
            const post = MakePostFromObject({
                id: uuidv4(),
                content: `If you're nothing without the suit, then you shouldn't have it.`,
                images: [],
                // @ts-ignore
                type: 'twatbook',
                crossPostId: uuidv4(),
            });
        }).toThrowError('Invalid post type: twatbook')
    });
});
