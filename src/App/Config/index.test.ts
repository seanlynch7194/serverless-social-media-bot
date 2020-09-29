import { config, set, reset } from './';

describe('Config service', () => {
    beforeEach(() => {
        reset();
    });

    it ('should set and get a value by key', () => {
        expect(config('random_key')).toBeNull();

        set('random_key', 'random_value');

        expect(config('random_key')).toBe('random_value');
    });

    it ('should set and get a nested value', () => {
        set('primary.secondary.teritary', 'nested value');
        expect(config('primary.secondary.teritary')).toBe('nested value');
    });

    it ('should not override existing values on the key', () => {
        set('primary.secondary.first', 'first value');
        set('primary.secondary.second', 'second value');

        expect(config('primary.secondary')).toEqual({
            first: 'first value',
            second: 'second value',
        });
    });

    it ('should return a default value if one doesnt exist', () => {
        expect(config('default_key', 'default_value')).toBe('default_value');
        expect(config('default_key.secondary_key.teritary_key', '3 deep value')).toBe('3 deep value');
    });

    it ('should not return a default value if a value already exists', () => {
        set('database.host', 'localhost');

        expect(config('database.host', '127.0.0.0')).toBe('localhost');
    });
});
