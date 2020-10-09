import { resolve } from '../../Container';
import { SocialNetwork } from '../../../Bot/Posts/Domain/SocialNetwork';

const Publisher = async (): Promise<any> => {
    const PublishNextToAllNetworks = resolve('PublishNextToAllNetworks');

    return PublishNextToAllNetworks();
};

export default Publisher; 
