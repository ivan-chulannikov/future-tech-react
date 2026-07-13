import { describe, expect, it } from 'vitest';
import { validateField } from './validateField';

describe('validateField', () => {
    it('returns error when email is empty', () => {
        expect(validateField('email', '')).toBe('Enter email');
    });
    it('returns error when email does not include @ symbol', () => {
        expect(validateField('email', 'ivannovi12ko')).toBe('Invalid email');
    });
    it('returns empty string when email is valid', () => {
        expect(validateField('email', 'ivannovi12ko@gmail.com')).toBe('');
    });
    it('returns error when password is empty', () => {
        expect(validateField('password', '')).toBe('Enter password');
    });
    it('returns error when password does not long at least 6 characters', () => {
        expect(validateField('password', 'fgtht')).toBe(
            'The password must be at least 6 characters long',
        );
    });
    it('returns empty string when password is', () => {
        expect(validateField('password', 'fgthtd')).toBe('');
    });
});
