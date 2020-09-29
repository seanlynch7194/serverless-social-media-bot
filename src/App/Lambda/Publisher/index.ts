import { resolve } from '../../Container';
import { SocialNetwork } from '../../../Bot/Posts/Domain/SocialNetwork';

const Publisher = async (): Promise<any> => {
    const postRandomToAllNetworks = resolve('PostRandomToAllNetworks');
    // const Twitter: SocialNetwork = resolve('Twitter');

    return Promise.resolve();
};

export default Publisher; 
