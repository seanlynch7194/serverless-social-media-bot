import env from './';

describe('env', () => {
    const ORIGINAL_ENV = process.env;

    beforeEach(() => {
        // clears the cache
        jest.resetModules();
        
        process.env = { ...ORIGINAL_ENV };
    });

    afterAll(() => {
        process.env = ORIGINAL_ENV;
    });

    it ('should return environment variable', () => {
        process.env.TEST_VARIABLE = 'testvariable'
        expect(env('TEST_VARIABLE')).toBe('testvariable');
    });

    it ('should return default if environment variable is not set', () => {
        expect(env('UNSET_TEST_VARIABLE', 'default_unset_variable')).toBe('default_unset_variable');
    });

    it ('should return false as a boolean', () => {
        process.env.TEST_FALSY_VARIABLE = 'false'
        expect(env('TEST_FALSY_VARIABLE')).toBeFalsy();
    });

    it ('should return true as a boolean', () => {
        process.env.TEST_TRUTHY_VARIABLE = 'true'
        expect(env('TEST_TRUTHY_VARIABLE')).toBeTruthy();
    });

    it ('should return empty as an empty string', () => {
        process.env.TEST_EMPTY_VARIABLE = 'empty'
        expect(env('TEST_EMPTY_VARIABLE')).toBe('');
    });

    it ('should return null string as null', () => {
        process.env.TEST_NULL_VARIABLE = 'null'
        expect(env('TEST_NULL_VARIABLE')).toBeNull();
    });
});
