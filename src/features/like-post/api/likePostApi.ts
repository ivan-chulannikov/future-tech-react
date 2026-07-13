import { baseApi } from '@/shared/api/baseApi';

type LikePostResponse = {
    postId: string;
    isLiked: boolean;
    likes: number;
};

export const likePostApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        likePost: build.mutation<LikePostResponse, string>({
            query: (postId) => ({
                url: `posts/${postId}/like`,
                method: 'POST',
            }),
            invalidatesTags: ['Posts'],
        }),
        unlikePost: build.mutation<LikePostResponse, string>({
            query: (postId) => ({
                url: `posts/${postId}/like`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts'],
        }),
    }),
});

export const { useLikePostMutation, useUnlikePostMutation } = likePostApi;
