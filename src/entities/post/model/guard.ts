import type { Post } from './types';

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const isAuthor = (value: unknown): value is Post['author'] => {
  if (!isObject(value)) return false;

  return typeof value.name === 'string' && typeof value.image === 'string';
};

const isStats = (value: unknown): value is Post['stats'] => {
  if (!isObject(value)) return false;

  return (
    typeof value.likes === 'string' &&
    typeof value.views === 'string' &&
    typeof value.shares === 'number'
  );
};

export const isPost = (value: unknown): value is Post => {
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
    isStats(value.stats) &&
    typeof value.image === 'string'
  );
};

export const isPostArray = (value: unknown): value is Post[] => {
  return Array.isArray(value) && value.every(isPost);
};