import app from './app';
import twitter from './twitter';

type ConfigStore = {[key: string]: any};

let store: ConfigStore = {
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
        const storeValue = byDotNotation(key, store);

        if (storeValue) {
            return storeValue;
        }

        if (defaultValue) {
            return defaultValue;
        }

        return null;
    } catch (err) {
        return defaultValue || null;
    }
}

export const set = (key: string, value: any): void => {
    store = setUpdateProp(store, key.split('.'), value);
}

/**
 * Reset all config values. This should not be called in production.
 * 
 */
export const reset = (): void => {
    store = {};
};

const byDotNotation = (dots: string, obj: any) => dots.split('.').reduce((o, i) => o[i], obj);

const setUpdateProp = (origin: ConfigStore, path: Array<string>, value: any): ConfigStore => {
    if (path.length === 0) { 
        throw new Error('Invalid object path');
    }

    if (path.length === 1) {
        return Object.assign({}, origin, {[path[0]]: value});
    } 

    if (origin[path[0]]) {
        return Object.assign({}, origin, {[path[0]]: setUpdateProp(origin[path[0]], path.slice(1), value)});

    } 
    
    return Object.assign({}, origin, {[path[0]]: setUpdateProp({}, path.slice(1), value)});
};

export default config;
