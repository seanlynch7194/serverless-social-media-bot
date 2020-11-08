import { resolve } from '../../Container';
import { Context } from 'aws-lambda';

type PublisherEvent = {};

/**
 * 
 * @param {any} event contains information from the invoker
 * @param {Object} context contains information about the invocation, function, and execution environment.
 */
const Publisher = async (event: PublisherEvent, context: Context): Promise<any> => {
    const PublishNextToAllNetworks = resolve('PublishNextToAllNetworks');

    return PublishNextToAllNetworks();
};

export default Publisher; 
