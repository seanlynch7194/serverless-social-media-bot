import ErrorTracker from '../../Domain/ErrorTracker';

export default (): ErrorTracker => {
    return {
        handler: (fn: Function) => {
            return (...args: any) => {
                return fn(...args)
                    .catch((err: Error) => {
                        console.log('ErrorTracker handled: ', err);
                        throw err;
                    });
            };
        },

        captureException: (err: Error) => {
            console.log('ErrorTracker captured: ', err);
            return Promise.resolve();
        },

        setContext: (key: string, value: any) => {
            console.log('Setting ErrorTracker context', key, value);
            return Promise.resolve();
        }
    };
};
