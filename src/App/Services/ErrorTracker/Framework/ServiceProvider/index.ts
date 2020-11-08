import { bind, resolve } from '../../../../Container';
import config from '../../../../Config';
import Sentry from '../../Infrastructure/Sentry';
import InMemory from '../../Infrastructure/InMemory';
import ErrorTracker from '../../Domain/ErrorTracker';
import { Environment } from '../../../../../Bot/Shared/Domain/Environment';

const ServiceProvider = () => {
    bind('ErrorTracker', (): ErrorTracker => {
        
        if (config('app.env') as Environment === 'local') {
            return InMemory();
        }

        return Sentry(config('sentry.dsn'), config('app.env')); 
    });
}

export default ServiceProvider;
