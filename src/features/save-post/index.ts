export {
    savedPostsReducer,
    toggleSavedPost,
    removeSavedPost,
    clearSavedPosts,
} from './model/savedPostsSlice';

export { selectSavedPostIds, selectIsPostSaved } from './model/selectors';

export type { SavedPostsState } from './model/types';
export { SavePostButton } from './ui/SavePostButton';
