type ErrorTracker = {
    handler: (handler: Function) => Function;

    captureException: (err: Error) => Promise<void>

    setContext: (key: string, value: any) => Promise<void>
}

export default ErrorTracker;
