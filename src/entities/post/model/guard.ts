import type { PostBase, PostPreview, PostDetails } from './types';
import type { PaginatedResponse } from '@/shared/api/types/types';
const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null;
};

const isStringArray = (value: unknown): value is string[] => {
    return Array.isArray(value) && value.every((item) => typeof item === 'string');
};

type SavedPostsResponse = {
    data: PostPreview[];
};
const isAvatar = (value: unknown): value is PostBase['author']['avatar'] => {
    if (!isObject(value)) return false;

    return (
        typeof value.src === 'string' &&
        typeof value.alt === 'string' &&
        typeof value.width === 'number' &&
        typeof value.height === 'number'
    );
};

const isAuthor = (value: unknown): value is PostBase['author'] => {
    if (!isObject(value)) return false;

    return typeof value.name === 'string' && isAvatar(value.avatar);
};

const isStats = (value: unknown): value is PostBase['stats'] => {
    if (!isObject(value)) return false;

    return (
        typeof value.likes === 'number' &&
        typeof value.views === 'number' &&
        typeof value.shares === 'number'
    );
};

const isPostBase = (value: unknown): value is PostBase => {
    if (!isObject(value)) return false;

    return (
        typeof value.id === 'string' &&
        (value.type === 'news' || value.type === 'blog') &&
        typeof value.title === 'string' &&
        typeof value.description === 'string' &&
        isAuthor(value.author) &&
        typeof value.categoryId === 'string' &&
        typeof value.date === 'string' &&
        typeof value.readingTime === 'string' &&
        isStats(value.stats)
    );
};

export const isPostPreview = (value: unknown): value is PostPreview => {
    if (!isObject(value)) return false;

    return isPostBase(value) && typeof value.isSaved === 'boolean';
};

const isBannerImage = (value: unknown): value is PostDetails['bannerImage'] => {
    if (!isObject(value)) return false;

    return (
        typeof value.src === 'string' &&
        typeof value.alt === 'string' &&
        typeof value.width === 'number' &&
        typeof value.height === 'number'
    );
};

const isPostContentSection = (
    value: unknown,
): value is PostDetails['content']['sections'][number] => {
    if (!isObject(value)) return false;

    return typeof value.title === 'string' && isStringArray(value.paragraphs);
};

const isPostContent = (value: unknown): value is PostDetails['content'] => {
    if (!isObject(value)) return false;

    return (
        typeof value.introduction === 'string' &&
        Array.isArray(value.sections) &&
        value.sections.every(isPostContentSection)
    );
};

export const isPostDetails = (value: unknown): value is PostDetails => {
    if (!isObject(value)) return false;

    const { bannerImage, content } = value;

    return isPostBase(value) && isBannerImage(bannerImage) && isPostContent(content);
};

export const isPostPreviewArray = (value: unknown): value is PostPreview[] => {
    return Array.isArray(value) && value.every(isPostPreview);
};

export const isPostDetailsArray = (value: unknown): value is PostDetails[] => {
    return Array.isArray(value) && value.every(isPostDetails);
};

export const isPaginatedPostPreviewResponse = (
    value: unknown,
): value is PaginatedResponse<PostPreview> => {
    if (!isObject(value)) {
        return false;
    }

    return (
        Array.isArray(value.data) &&
        isPostPreviewArray(value.data) &&
        typeof value.page === 'number' &&
        typeof value.limit === 'number' &&
        typeof value.total === 'number' &&
        typeof value.pages === 'number'
    );
};


export const isSavedPostsResponse = (value: unknown): value is SavedPostsResponse => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'data' in value &&
        isPostPreviewArray(value.data)
    );
};