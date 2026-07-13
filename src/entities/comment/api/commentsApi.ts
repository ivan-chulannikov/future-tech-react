import { baseApi } from '@/shared/api/baseApi';
import type  { PaginatedResponse } from '@/shared/api/types/types';
import type { Comment } from '../model/types';
import { isPaginatedCommentsResponse } from '../model/guards';
export const commentApi = baseApi.injectEndpoints({
     endpoints: (build) => ({
            getPostComments: build.query<PaginatedResponse<Comment>,string>({
                query: (postId) => `posts/${postId}/comments`,
                transformResponse: (response: unknown) => {
                    if (!isPaginatedCommentsResponse(response)) {
                        throw new Error('invalid coments response');
                    }
                    return response;
                },
                  providesTags: (_result, _error, postId) => [
        {
            type: 'Comments',
            id: postId,
        },
    ],
            }),
            
        }),
});


export const { useGetPostCommentsQuery } = commentApi;
