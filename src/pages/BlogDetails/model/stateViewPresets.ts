import type { StateViewProps } from "@/shared/ui/StateView";
export const blogDetailsStateViewContent = {
    loading: {
        variant: 'loading',
        title: 'Loading blog post',
        description: 'Please wait while we prepare the article content.',

    },
    error: {
        variant: 'error',
        title: 'Unable to load blog post',
        description: 'Something went wrong while loading this article. Please try again.'
    },

} satisfies Record<string, Omit<StateViewProps, 'action' | 'className'>>;
