import ErrorTracker from '../../Domain/ErrorTracker';
import { Environment } from '../../../../../Bot/Shared/Domain/Environment';
const SentryIO = require("@sentry/serverless");

const Sentry = (dsn: string, environment: Environment): ErrorTracker => {
    SentryIO.AWSLambda.init({
        dsn,
        environment,
        debug: (environment === 'local' ? true : false),
    });

    return {
        handler: (handler) => {
            return SentryIO.AWSLambda.wrapHandler(handler);
        },

        captureException: (err: Error): Promise<void> => {
            SentryIO.captureException(err);
            return Promise.resolve();
        },

        setContext: (key: string, value: any): Promise<void> => {
            SentryIO.setContext(key, value);
            return Promise.resolve();
        }
    };
}

export default Sentry;
