import { describe, it, expect } from 'vitest';
import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage', () => {
    it('returns null when error is missing', () => {
        expect(getErrorMessage(null)).toBeNull();
    });
    it('returns error message when error data has message', () => {
        expect(
            getErrorMessage({
                data: {
                    message: 'Not Found',
                },
            }),
        ).toBe('Not Found');
    });
    it('returns fallback message when error data has no message', () => {
        expect(
            getErrorMessage({
                data: {},
            }),
        ).toBe('Something went wrong');
    });
    it('returns fallback message when error has no data', () => {
        expect(getErrorMessage({})).toBe('Something went wrong');
    });
    it('converts error message to string', () => {
        expect(
            getErrorMessage({
                data: {
                    message: 404,
                },
            }),
        ).toBe('404');
    });
});
