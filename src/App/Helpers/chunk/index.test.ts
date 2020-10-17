import chunk from './';

describe('chunk helper', () => {
    it ('should return an array of arrays of the specified size', () => {
        expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([
            [1, 2],
            [3, 4],
            [5],
        ]);

        expect(chunk([1], 2)).toEqual([
            [1],
        ]);
    });
});
