import InMemoryRepository from '../../../Infrastructure/InMemoryRepository';
import PublishNextToAllNetworks from './';
import { Post, MakePostFromObject, PostPrimitiveObject } from '../../../Domain/Post';
import { SocialNetwork } from '../../../Domain/SocialNetwork';
import PostsRepository from '../../../Domain/PostsRepository';
import MakePostId from '../../../Domain/PostId';


const POST_1 = MakePostFromObject({
    id: '4ae3a46b-4c18-47eb-a715-76fa0011afca',
    content: 'lorem ipsum doler',
    images: [],
    type: 'twitter',
    crossPostId: '1',
});

const POST_2 = MakePostFromObject({
    id: 'eb621b82-e099-4804-ae26-7c18d48f442c',
    content: 'lorem ipsum doler',
    images: [],
    type: 'twitter',
    crossPostId: '2',
});

const POST_3 = MakePostFromObject({
    id: 'f38c4620-5707-4ff3-a287-77aaa4d47a0b',
    content: 'lorem ipsum doler',
    images: [],
    type: 'twitter',
    crossPostId: '2',
});


describe('PublishNextToAllNetworks', () => {
    it ('should publish all cross posts and remove them from the repository', () => {
        const repository = InMemoryRepository();
        const network = makeMockNetwork();

        return saturateRepository(repository).then(() => {
            return PublishNextToAllNetworks(repository, network)().then(() => {
                // TODO: test that publish was called with each post
                expect(network.publish).toHaveBeenCalledTimes(2);

                return Promise.all([
                    repository.getPost(MakePostId('eb621b82-e099-4804-ae26-7c18d48f442c')).then((post) => {
                        expect(post).toBeNull();
                    }),
                    repository.getPost(MakePostId('f38c4620-5707-4ff3-a287-77aaa4d47a0b')).then((post) => {
                        expect(post).toBeNull();
                    }),
                    repository.getPost(MakePostId('4ae3a46b-4c18-47eb-a715-76fa0011afca')).then((post) => {
                        expect(post).not.toBeNull();
                    }),

                ]);
            });
        });
    })
});

const saturateRepository = (repository: PostsRepository) => {
    return Promise.all([
        POST_2,
        POST_3,
        POST_1,
    ].map((post: Post) => {
        return repository.addPost(post)
    }));
}

const makeMockNetwork = () => {
    return {
        publish: jest.fn((post: Post) => Promise.resolve()),
    } as SocialNetwork;
};