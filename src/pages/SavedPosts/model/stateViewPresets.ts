import type { StateViewProps } from '@/shared/ui/StateView';
export const savedPostsViewContent = {
    loading: {
        variant: 'loading',
        title: 'Loading saved blogs',
        description: 'Please wait while we prepare the article content.',
    },
    error: {
        variant: 'error',
        title: 'Unable to load saved blogs',
        description: 'Something went wrong while loading this article. Please try again.',
    },
    empty: {
        variant: 'empty',
        title: 'No saved posts yet',
        description: 'Save interesting posts and they will appear here.',
    },
    errorFindIds: {
        variant: 'error',
        title: 'Saved posts were not found',
        description: 'The posts may have been removed or are temporarily unavailable.',
    },
} satisfies Record<string, Omit<StateViewProps, 'action' | 'className'>>;
