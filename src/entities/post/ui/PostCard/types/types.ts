import type { PostPreview } from '@/entities/post';
import type { ReactNode } from 'react';
export type PostCardProps = {
    post: PostPreview;
    actionsSlot?: ReactNode;
};
