import MakeTwitterPost, { MakeTwitterPostFromObject } from '.';
import MakePostId from '../PostId';
import MakeTwitterPostContent from '../TwitterPostContent';

describe('Post', () => {
    const makeTestTweet = () => {
        return MakeTwitterPost(
            MakePostId('mockId'), 
            MakeTwitterPostContent('tweet content'),
            ['https://mock.images.com/filename.jpg'],
            'crossPostId',
        );
    }

    it('should return the post id', () => {
        expect(makeTestTweet().getId().getValue()).toBe('mockId');
    });

    it ('should return the post body', () => {
        expect(makeTestTweet().getContent()).toBe('tweet content');
    });

    it('should return an array of image urls', () => {
        expect(makeTestTweet().getImages()).toEqual([
            'https://mock.images.com/filename.jpg',
        ])
    })

    it ('should make a Post object from a primitive object', () => {
        MakeTwitterPostFromObject({
            id: 'fakeId',
            content: 'lorem ipsum doler',
            images: [],
            type: 'twitter',
            crossPostId: 'crossPostId',
        });
    });
});
