import { baseApi } from '@/shared/api/baseApi';
import type { AddCommentReq } from './types';

export const addCommentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       addComment: builder.mutation<unknown, AddCommentReq>({
    query: ({ postId, content }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        body: {
            content,
        },
    }),

    invalidatesTags: (_result, _error, { postId }) => [
        {
            type: 'Comments',
            id: postId,
        },
        'Posts',
    ],
}),
    }),
});


export const { useAddCommentMutation } = addCommentApi