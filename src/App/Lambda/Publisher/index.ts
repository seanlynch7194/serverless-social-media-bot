import { resolve } from '../../Container';
import { Context } from 'aws-lambda';

type PublisherEvent = {};

/**
 * 
 * @param {PublisherEvent} event contains information from the invoker
 * @param {Context} context contains information about the invocation, function, and execution environment.
 */
const Publisher = async (event: PublisherEvent, context: Context): Promise<any> => {
    const PublishNextToAllNetworks = resolve('PublishNextToAllNetworks');

    return PublishNextToAllNetworks();
};

export default Publisher; 
