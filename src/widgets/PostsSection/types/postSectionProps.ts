import { Category } from '@/entities/category';

import { PostBase } from '@/entities/post/model/types';
import { SectionHeaderProps } from '@/shared/ui/SectionHeader';
import { ReactNode } from 'react';
export interface PostSectionProps {
    posts: PostBase[];
    tabs: Category[];
    sectionHeader: SectionHeaderProps;
    activeCategoryId: string;
    handleCategoryChange: (activeCategoryId: string) => void;

    isPostsLoading: boolean;
    isPostsError: boolean;
    isTabsLoading: boolean;
    isTabsError: boolean;
    isPostsFetching: boolean;
    onPostsRetry: () => void;
    onTabsRetry: () => void;
    paginationSlot?: ReactNode;
    renderPostActions?: (post: PostBase) => ReactNode;
}
