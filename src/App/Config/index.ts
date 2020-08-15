import app from './app';
import twitter from './twitter';

const store = {
    app,
    twitter: twitter,
};

/**
 * 
 * @param key The configuration values may be accessed using "dot" syntax
 * @param defaultValue Retrieve a default value if the configuration value does not exist
 */
export const config = (key: string, defaultValue?: any) => {
    try {
        return byDotNotation(key, store);
    } catch (err) {
        return defaultValue || null;
    }
}

const byDotNotation = (dots: string, obj: any) => dots.split('.').reduce((o,i)=>o[i], obj);

export default config;
