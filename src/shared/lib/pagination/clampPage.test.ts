import { describe, it, expect } from 'vitest';
import { clampPage } from './clampPage';

describe('clampPage', () => {
    it('returns last page when current page is greater than total pages', () => {
        expect(clampPage(4, 3)).toBe(3);
    });
    it('returns current page when it equals total pages', () => {
        expect(clampPage(3, 3)).toBe(3);
    });
    it('returns current page when it is less than total pages', () => {
        expect(clampPage(2, 3)).toBe(2);
    });
    it('returns 1 when total pages is zero', () => {
        expect(clampPage(1, 0)).toBe(1);
    });
});
