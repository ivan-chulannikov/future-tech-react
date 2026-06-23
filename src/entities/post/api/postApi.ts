import type { PostDetails, PostPreview } from '../model/types';
import type { PaginatedResponse } from '@/shared/api/types/types';
import { baseApi } from '@/shared/api/baseApi';
import { isPaginatedPostPreviewResponse, isPostPreviewArray, isPostDetails } from '../model/guard';
type GetPostsParams = {
    categoryId: string;
    page: number;
    limit: number;
};

export const postApiRtk = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPosts: build.query<PaginatedResponse<PostPreview>, GetPostsParams>({
            query: ({ categoryId, page, limit }) => {
                const params = new URLSearchParams();
                if (categoryId !== 'all') {
                    params.set('categoryId', categoryId);
                }
                params.set('_page', String(page));
                params.set('_per_page', String(limit));
                return `posts?${params.toString()}`;
            },
            transformResponse: (response: unknown) => {
                if (!isPaginatedPostPreviewResponse(response)) {
                    throw new Error('Invalid posts response');
                }
                return response;
            },
        }),
        getAllPosts: build.query<PostPreview[], void>({
            query: () => 'posts',
            transformResponse: (response: unknown) => {
                if (!isPostPreviewArray(response)) {
                    throw new Error('Invalid all posts response');
                }
                return response;
            },
        }),
        getPostById: build.query<PostDetails, string>({
            query: (postId) => `postDetails/${encodeURIComponent(postId)}`,
            transformResponse: (response: unknown) => {
                if (!isPostDetails(response)) {
                    throw new Error('Invalid post details response');
                }
                return response;
            },
        }),
    }),
});

export const { useGetPostsQuery, useGetAllPostsQuery, useGetPostByIdQuery } = postApiRtk;
