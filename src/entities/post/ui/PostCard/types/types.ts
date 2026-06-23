import type { PostPreview } from '../../../model/types';
import { ReactNode } from 'react';
export type PostCardProps = {
    post: PostPreview;
    actionsSlot?: ReactNode;
};
