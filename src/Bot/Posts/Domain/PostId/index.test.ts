import makePostId from './';
import InvalidPostId from '../Exceptions/InvalidPostId';

describe('PostId', () => {
    it ('should return the post id', () => {
        const PostId = makePostId('f74f8f44-7961-44fd-ba39-8d1ddf380efd');
        expect(PostId.getValue()).toBe('f74f8f44-7961-44fd-ba39-8d1ddf380efd');
    });

    it ('should throw an InvalidPostId if the id is less than 1 character', () => {
        expect(() => {
            makePostId('');
        }).toThrowError(InvalidPostId.tooShort());
    });

    it ('should throw an InvalidPostId if the id is more than 255 characters', () => {
        expect(() => {
            makePostId('wELh3yR*De_WLZbgjGKtMM2bAeGVVwXsDAFp-gy_ffEW@kxRL.oWiQdbEcZTCPaYwELh3yR*De_WLZbgjGKtMM2bAeGVVwXsDAFp-gy_ffEW@kxRL.oWiQdbEcZTCPaYwELh3yR*De_WLZbgjGKtMM2bAeGVVwXsDAFp-gy_ffEW@kxRL.oWiQdbEcZTCPaYwELh3yR*De_WLZbgjGKtMM2bAeGVVwXsDAFp-gy_ffEW@kxRL.oWiQdbEcZTCPaY');
        }).toThrowError(InvalidPostId.tooLong());
    });
});
