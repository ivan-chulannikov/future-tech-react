import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type  { SavedPostsState } from './types';

const initialState: SavedPostsState = {
    savedPostIds: [],
};
const savedPostsSlice = createSlice({
    name: 'savedPosts',
    initialState,
    reducers: {
        toggleSavedPost(state, action: PayloadAction<string>) {
            const postId = action.payload;
            if (state.savedPostIds.includes(postId)) {
                state.savedPostIds = state.savedPostIds.filter((id) => id !== postId);
            } else {
                state.savedPostIds.push(postId);
            }
        },
        removeSavedPost(state, action: PayloadAction<string>) {
            const postId = action.payload;
            state.savedPostIds = state.savedPostIds.filter((id) => id !== postId);
        },
        clearSavedPosts(state) {
            state.savedPostIds = [];
        },
    },
});
export const { toggleSavedPost, removeSavedPost, clearSavedPosts } = savedPostsSlice.actions;
export const savedPostsReducer = savedPostsSlice.reducer;
