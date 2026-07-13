import { describe, it, expect } from 'vitest';
import { getValidPage } from './getValidPage';

describe('getValidPage', () => {
    it('returns page number when page param is valid', () => {
        expect(getValidPage('2')).toBe(2);
    });
    it('returns 1 when page param is missing', () => {
        expect(getValidPage(null)).toBe(1);
    });
    it('returns 1 when page param is empty', () => {
        expect(getValidPage('')).toBe(1);
    });
    it('returns 1 when page param is not a number', () => {
        expect(getValidPage('abc')).toBe(1);
    });
    it('returns 1 when page param is zero', () => {
        expect(getValidPage('0')).toBe(1);
    });
    it('returns 1 when page param is negative', () => {
        expect(getValidPage('-5')).toBe(1);
    });
    it('returns 1 when page param is decimal', () => {
        expect(getValidPage('1.5')).toBe(1);
    });
});
