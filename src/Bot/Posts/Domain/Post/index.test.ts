import MakePost, { MakePostFromObject } from './';
import MakePostId from '../PostId';

describe('Post', () => {
    it('should return the post id', () => {
        const MOCK_ID = 'mockId';
        expect(MakePost(MakePostId(MOCK_ID), 'post body').getId().getValue()).toBe(MOCK_ID);
    });

    it ('should return the post body', () => {
        const MOCK_CONTENT = 'post body content';
        expect(MakePost(MakePostId('mockId'), MOCK_CONTENT).getContent()).toBe(MOCK_CONTENT);
    });

    it ('should make a Post object from a primitive object', () => {
        MakePostFromObject({
            id: 'fakeId',
            content: 'lorem ipsum doler',
        });
    });
});
