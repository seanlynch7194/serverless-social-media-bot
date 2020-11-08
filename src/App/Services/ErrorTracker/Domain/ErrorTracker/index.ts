type ErrorTracker = {
    handler: (handler: Function) => Function;

    captureException: (err: Error) => Promise<void>
}

export default ErrorTracker;
