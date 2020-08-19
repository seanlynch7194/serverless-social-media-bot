import { MakeCrossPostId } from './';

describe('CrossPostId', () => {
    it ('should make a CrossPostId from uuid string', () => {
        expect(MakeCrossPostId('4286e918-0165-4206-8762-57b768c0dbd2')).toEqual({
            getValue: expect.any(Function),
        });
    });

    it ('should return the value as a string', () => {
        expect(MakeCrossPostId('594457a5-d2ec-41e2-b260-9abf20d2ecb5').getValue()).toEqual('594457a5-d2ec-41e2-b260-9abf20d2ecb5');
    });

    it ('should throw an error if the value exceeds 255 characters', () => {
        expect(() => {
            MakeCrossPostId('Non aute eu laboris eiusmod quis qui ea elit labore. Enim esse magna adipisicing id et fugiat ea amet adipisicing dolor sint Lorem ut. Mollit magna aliqua magna consequat. Culpa occaecat voluptate cupidatat in commodo anim exercitation do amet. Esse id duis aute dolore aliqua dolor enim dolore consequat amet laborum.')
        }).toThrowError(new Error('CrossPostId cannot exceed 255 characters'));
    });
});
