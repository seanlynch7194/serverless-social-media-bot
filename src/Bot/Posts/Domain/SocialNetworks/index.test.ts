import { SocialNetwork } from '../SocialNetwork';
import { Post, MakePostFromObject } from '../Post';
import SocialNetworksFactory from './';

describe('SocialNetworks', () => {
    it ('should call "publish" on all social networks', () => {
        const mock1 = makeMockNetwork();
        const mock2 = makeMockNetwork();

        const SocialNetworks = SocialNetworksFactory([mock1, mock2]);
        
        const mockPost = MakePostFromObject({
            id: 'xxx',
            content: 'Minim elit irure id ut nulla enim elit nostrud ea laborum qui id.',
            images: [],
            type: 'twitter',
            crossPostId: 'xxx',
        })

        return SocialNetworks.publish(mockPost).then(() => {
            expect(mock1.publish).toHaveBeenCalledWith(mockPost);
            expect(mock2.publish).toHaveBeenCalledWith(mockPost);
        });
    });
});

const makeMockNetwork = () => {
    return {
        publish: jest.fn((post: Post) => Promise.resolve()),
    } as SocialNetwork;
};
