import { SocialNetwork } from '../SocialNetwork';
import { Post } from '../Post';

type NetworkList = Array<SocialNetwork>;

/**
 * Create function that accepts a callback and maps over all networks
 * 
 * @param networks 
 */
const networkMap = (networks: NetworkList): Function => {
    return (callback: Function) => Promise.all(networks.map((network: SocialNetwork) => callback(network)))
}

/**
 * Social network wrapper that accepts an array of social networks
 * and executes methods on each network.
 * 
 */
export default (networks: NetworkList): SocialNetwork => {
    const mapNetworks = networkMap(networks);

    return {
        publish: (post: Post) => {
            return mapNetworks((network: SocialNetwork) => {
                return network.publish(post);
            });
        },
    };
}