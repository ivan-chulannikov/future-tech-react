import type { ReactNode } from 'react';
export interface PostActionsProps {
    likes: number;
    shares: number;
    views: number;
    className?: string;
    children?: ReactNode;
}
