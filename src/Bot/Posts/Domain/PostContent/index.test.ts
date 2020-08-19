import { MakePostContent } from './';

const MOCK_MESSAGE = 'Nostrud ipsum dolor enim eiusmod minim consequat magna. Commodo mollit aliqua occaecat ad qui veniam fugiat commodo sunt do eu nulla. Sint qui esse deserunt pariatur. Nulla irure irure anim quis do deserunt officia non cillum occaecat labore velit. Cillum enim ea sunt dolor esse pariatur anim ut exercitation sit. Anim qui sint duis cillum anim voluptate elit aute duis qui voluptate ullamco. Enim adipisicing sunt et veniam magna proident labore et amet laborum sunt consectetur.'

describe('PostContent', () => {
    it ('should make a PostContent from string', () => {
        expect(MakePostContent(MOCK_MESSAGE)).toEqual({
            getValue: expect.any(Function),
        });
    });

    it ('should return the full post content as a string', () => {
        expect(MakePostContent(MOCK_MESSAGE).getValue()).toEqual(MOCK_MESSAGE);
    });
});
