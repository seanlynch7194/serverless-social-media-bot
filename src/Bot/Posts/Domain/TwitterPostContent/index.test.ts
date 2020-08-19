import MakeTwitterPostContent from './';
import PostContentTooLong from '../Exceptions/PostContentTooLong';

const MOCK_MESSAGE = 'Nostrud ipsum dolor enim eiusmod minim consequat magna. Commodo mollit aliqua occaecat ad qui veniam fugiat commodo sunt do eu nulla. Sint qui esse deserunt pariatur. Nulla irure irure anim quis do deserunt officia non cillum occaecat labore velit. Cillum enim ea sunt dolor esse.'
const MOCK_TOO_LONG_MESSAGE = 'Nostrud ipsum dolor enim eiusmod minim consequat magna. Commodo mollit aliqua occaecat ad qui veniam fugiat commodo sunt do eu nulla. Sint qui esse deserunt pariatur. Nulla irure irure anim quis do deserunt officia non cillum occaecat labore velit. Cillum enim ea sunt dolor esse pariatur anim ut exercitation sit. Anim qui sint duis cillum anim voluptate elit aute duis qui voluptate ullamco. Enim adipisicing sunt et veniam magna proident labore et amet laborum sunt consectetur. '

describe('TwitterPostContent', () => {
    it ('should make a TwitterPostContent object from string', () => {
        expect(MakeTwitterPostContent(MOCK_MESSAGE)).toEqual({
            getValue: expect.any(Function),
        });
    });

    it ('should return the full TwitterPostContent as a string', () => {
        expect(MakeTwitterPostContent(MOCK_MESSAGE).getValue()).toEqual(MOCK_MESSAGE);
    });

    it ('should throw an error if the content exceeds the maximum tweet length', () => {
        expect(() => {
            MakeTwitterPostContent(MOCK_TOO_LONG_MESSAGE);
        }).toThrowError(PostContentTooLong.withMax(280));
    });
});
