import type { PostBase } from '@/entities/post/model/types';
import type { ReactNode } from 'react';
export type PostListProps = {
    posts: PostBase[];
    renderActions?: (post: PostBase) => ReactNode;
};
