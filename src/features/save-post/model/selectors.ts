import type { RootState } from "@/app/store/store";

export const selectSavedPostIds = (state: RootState) => state.savedPosts.savedPostIds
export const selectIsPostSaved = (
  state: RootState,
  postId: string
) => state.savedPosts.savedPostIds.includes(postId);