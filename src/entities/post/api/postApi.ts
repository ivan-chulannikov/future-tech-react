import { apiClient } from '@/shared/api/client';
import { isPostDetails, isPostPreviewArray } from '../model/guard';
import type { PostDetails, PostPreview } from '../model/types';

export const fetchPosts = async (
  categoryId: string = 'all',
): Promise<PostPreview[]> => {
  const endpoint =
    categoryId === 'all'
      ? 'posts'
      : `posts?categoryId=${categoryId}`;

  return apiClient<PostPreview[]>(endpoint, isPostPreviewArray);
};

export const fetchPostById = async (postId: string): Promise<PostDetails> => {
  return apiClient<PostDetails>(`postDetails/${postId}`, isPostDetails);
};