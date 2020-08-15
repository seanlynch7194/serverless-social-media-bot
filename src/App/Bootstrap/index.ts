import config from '../Config';

export default () => {
    config('app.providers').map((provider: Function) => provider());
};
