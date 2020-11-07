import { bind, resolve } from '../../../../Container';
import config from '../../../../Config';
import Sentry from '../../Infrastructure/Sentry';
import ErrorTracker from '../../Domain/ErrorTracker';
import { Environment } from '../../../../../Bot/Shared/Domain/Environment';

const ServiceProvider = () => {
    bind('ErrorTracker', (): ErrorTracker => {

        if (config('app.env') as Environment === 'local') {
            return {
                handler: (handler: Function) => {
                    return (...args: any) => {
                        try {
                            handler(...args);
                        } catch (err) {
                            console.log('ErrorTracker handled: ', err);
                            throw err;
                        }
                    };
                },

                captureException: (err: Error) => {
                    console.log('ErrorTracker captured: ', err);
                    return Promise.resolve();
                }
            } as ErrorTracker;
        }

        return Sentry(config('sentry.dsn'), config('app.env')); 
    });
}

export default ServiceProvider;
