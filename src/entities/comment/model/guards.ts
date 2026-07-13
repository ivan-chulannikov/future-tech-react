import { isObject } from '@/shared/guards/guards';
import type { Comment } from './types';
import type { PaginatedResponse } from '@/shared/api/types/types';
const isCommentAuthorTest = (value: unknown): value is Comment['author'] => {
    if (!isObject(value)) return false;
    return typeof value.id === 'string' && typeof value.username === 'string';
};
const isComment = (value: unknown): value is Comment => {
    if (!isObject(value)) return false;
    return (
        typeof value.id === 'string' &&
        typeof value.content === 'string' &&
        typeof value.createdAt === 'string' &&
        typeof value.updatedAt === 'string' &&
        isCommentAuthorTest(value.author)
    );
};
const isCommentArray = (value: unknown): value is Comment[] => {
    return Array.isArray(value) && value.every(isComment);
};
export const isPaginatedCommentsResponse = (
    value: unknown,
): value is PaginatedResponse<Comment> => {
    if (!isObject(value)) return false;
    return (
        isCommentArray(value.data) &&
        typeof value.page === 'number' &&
        typeof value.limit === 'number' &&
        typeof value.total === 'number' &&
        typeof value.pages === 'number'
    );
};
