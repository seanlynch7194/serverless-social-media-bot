import { bind, resolve } from './';

describe('Container', () => {
    it ('should set and get an item from the container', () => {
        bind('MockService', () => {
            return 69;
        });

        expect(resolve('MockService')).toBe(69);
    });

    it ('should throw an error if a resolved name is not bound', () => {
        expect(() => {
            resolve('IDontExist');
        }).toThrowError(new Error('IDontExist is not bound to the container'));
    })
});
