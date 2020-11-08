jest.mock('@sentry/serverless', () => {
    return {
        AWSLambda: {
            init: jest.fn(),
            wrapHandler: jest.fn(),
        },
        captureException: jest.fn(),
    }
})


import Sentry from './';
const SentryIO = require("@sentry/serverless");

describe('Sentry', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialise a Sentry instance with passed in values', () => {
        Sentry('mock_dsn', 'local');

        expect(SentryIO.AWSLambda.init).toHaveBeenCalledWith({
            dsn: 'mock_dsn',
            environment: 'local',
            debug: true,
        });
    });

    it('should not enable debug mode if the environment is production', () => {
        Sentry('mock_dsn', 'production');

        expect(SentryIO.AWSLambda.init).toHaveBeenCalledWith(expect.objectContaining({
            debug: false,
        }));
    });

    it ('should wrap a Lambda function', () => {
        const lambda = jest.fn();
        const ErrorTracker = Sentry('mock_dsn', 'stage');

        ErrorTracker.handler(lambda);

        expect(SentryIO.AWSLambda.wrapHandler).toHaveBeenCalledWith(lambda);
    });

    it ('should capture an error', () => {
        const error = new Error(`I am serious. And don't call me Shirley.`);
        const ErrorTracker = Sentry('mock_dsn', 'stage');

        ErrorTracker.captureException(error);

        expect(SentryIO.captureException).toHaveBeenCalledWith(error);
    });
});
