import type { StateViewProps } from '@/shared/ui/StateView';

export const commentsStateViewContent = {
    loading: {
        variant: 'loading',
        title: 'Loading comments',
        description: 'Please wait while comments are loading.',
    },

    error: {
        variant: 'error',
        title: 'Comments could not be loaded',
        description: 'Please try again.',
    },

    empty: {
        variant: 'empty',
        title: 'No comments yet',
        description: 'Be the first to leave a comment.',
    },
} satisfies Record<
    string,
    Omit<StateViewProps, 'action' | 'className'>
>;