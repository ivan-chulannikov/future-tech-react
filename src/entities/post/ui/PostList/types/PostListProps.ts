import type {PostPreview } from '@/entities/post/model/types';
import type { ReactNode } from 'react';
export type PostListProps = {
    posts: PostPreview[];
    renderActions?: (post: PostPreview) => ReactNode;
};
