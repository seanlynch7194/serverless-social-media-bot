import { resolve } from '../../Container';

const Publisher = async (): Promise<any> => {
    const PublishNextToAllNetworks = resolve('PublishNextToAllNetworks');

    return PublishNextToAllNetworks();
};

export default Publisher; 
