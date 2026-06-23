import type { StateViewProps } from '@/shared/ui/StateView';

export const postsSectionStateViewContent = {
    postsLoading: {
        variant: 'loading',
        title: 'Loading blog posts',
        description: 'Please wait while we load the latest posts.',
    },

    postsError: {
        variant: 'error',
        title: 'Unable to load blog posts',
        description: 'Something went wrong while loading posts. Please try again.',
    },

    postsEmpty: {
        variant: 'empty',
        title: 'No posts found',
        description: 'There are no blog posts for this category yet.',
    },

    tabsError: {
        variant: 'error',
        title: 'Unable to load categories',
        description: 'The post categories could not be loaded. You can try again.',
    },
    tabsLoading: {
        variant: 'loading',
        title: 'Loading categories',
        description: 'Please wait while we load the post categories.',
    },
} satisfies Record<string, Omit<StateViewProps, 'action' | 'className'>>;
