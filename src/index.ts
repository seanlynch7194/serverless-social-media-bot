import Bootstrap from './App/Bootstrap';
import PublisherFn from './App/Lambda/Publisher';
import IErrorTracker from './App/Services/ErrorTracker/Domain/ErrorTracker';
import { resolve } from './App/Container';

Bootstrap();

const ErrorTracker: IErrorTracker = resolve('ErrorTracker');

export const Publisher = ErrorTracker.handler(PublisherFn);
