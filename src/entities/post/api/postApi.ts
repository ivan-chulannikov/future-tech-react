import { apiClient } from "@/shared/api/client";
import { isPostArray } from "../model/guard";
import { Post } from "../model/types";

export const fetchPosts = async (categoryId: string = 'all'): Promise<Post[]> => {
  const endpoint =
    categoryId === 'all'
      ? 'posts'
      : `posts?categoryId=${categoryId}`;

  return apiClient<Post[]>(endpoint, isPostArray);
};
