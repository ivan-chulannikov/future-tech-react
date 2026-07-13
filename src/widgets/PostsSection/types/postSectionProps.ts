import type { Category } from '@/entities/category';

import type { PostPreview } from '@/entities/post/model/types';
import type { SectionHeaderProps } from '@/shared/ui/SectionHeader';
import type { ReactNode } from 'react';
export interface PostSectionProps {
    posts: PostPreview[];
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
    renderPostActions?: (post: PostPreview) => ReactNode;
}
