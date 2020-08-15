import { resolve } from '../../Container/';

const handler = (postRandomToAllNetworks: Function) => {
    return async (): Promise<any> => {
        return postRandomToAllNetworks();
    }
};

export default handler(resolve('command.postRandomToAllNetworks')); 