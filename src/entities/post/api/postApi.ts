import type { PostDetails, PostPreview } from '../model/types';
import type { PaginatedResponse } from '@/shared/api/types/types';
import { baseApi } from '@/shared/api/baseApi';
import { isPaginatedPostPreviewResponse,  isPostDetails, isSavedPostsResponse } from '../model/guard';
type GetPostsParams = {
    categoryId?: string;
    page: number;
    limit: number;
    savedOnly?:boolean;
     
};

export const postApiRtk = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPosts: build.query<PaginatedResponse<PostPreview>, GetPostsParams>({
    query: ({ categoryId, page, limit, savedOnly }) => {
        const params = new URLSearchParams();

        params.set('page', String(page));
        params.set('limit', String(limit));

        if (categoryId && categoryId !== 'all') {
            params.set('categoryId', categoryId);
        } 
       

        if (savedOnly) {
            params.set('savedOnly', 'true');
        }

        return `posts?${params.toString()}`;
    },

    transformResponse: (response: unknown) => {
        if (!isPaginatedPostPreviewResponse(response)) {
            throw new Error('Invalid posts response');
        }

        return response;
    },

    providesTags: ['Posts'],
}),
       
        getPostById: build.query<PostDetails, string>({
            query: (id) => `posts/${id}`,
            transformResponse: (response: unknown) => {
                if (!isPostDetails(response)) {
                    throw new Error('Invalid post details response');
                }

                return response;
            },
        }),
      getSavedPosts: build.query<PostPreview[], void>({
    query: () => 'saved-posts',
    transformResponse: (response: unknown) => {
        if (!isSavedPostsResponse(response)) {
            throw new Error('Invalid saved posts response');
        }

        return response.data;
    },
    providesTags: ['SavedPosts'],
}),

addSavedPost: build.mutation<{ message: string }, string>({
    query: (postId) => ({
        url: `saved-posts/${postId}`,
        method: 'POST',
    }),
    invalidatesTags: ['Posts', 'SavedPosts'],
}),

deleteSavedPost: build.mutation<{ message: string }, string>({
    query: (postId) => ({
        url: `saved-posts/${postId}`,
        method: 'DELETE',
    }),
    invalidatesTags: ['Posts', 'SavedPosts'],
}),
    }),
});

export const { useGetPostsQuery,  useGetPostByIdQuery, useGetSavedPostsQuery, useAddSavedPostMutation, useDeleteSavedPostMutation } = postApiRtk;
