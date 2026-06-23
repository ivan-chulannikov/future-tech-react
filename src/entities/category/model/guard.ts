import type { Category } from './types';

const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null;
};

export const isCategory = (value: unknown): value is Category => {
    if (!isObject(value)) return false;

    return (
        typeof value.id === 'string' &&
        typeof value.label === 'string' &&
        typeof value.value === 'string'
    );
};

export const isCategoryArray = (value: unknown): value is Category[] => {
    return Array.isArray(value) && value.every(isCategory);
};
