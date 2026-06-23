import { PostBase } from '@/entities/post/model/types';
import { ReactNode } from 'react';
export type PostListProps = {
    posts: PostBase[];
    renderActions?: (post: PostBase) => ReactNode;
};
