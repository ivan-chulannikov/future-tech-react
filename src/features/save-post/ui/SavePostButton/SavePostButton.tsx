import { useAddSavedPostMutation, useDeleteSavedPostMutation } from '@/entities/post/api/postApi';

import type { SavePostButtonProps } from './types/SavePostButtonProps';

export const SavePostButton = ({ postId, isSaved, className = '' }: SavePostButtonProps) => {
    const [addSavedPost, { isLoading: isAddSavedPostLoading }] = useAddSavedPostMutation();
    const [deleteSavedPost, { isLoading: isDeleteSavedPostLoading }] = useDeleteSavedPostMutation();

    const isLoading = isAddSavedPostLoading || isDeleteSavedPostLoading;

    const handleToggleSavedPost = async () => {
        try {
            if (isSaved) {
                await deleteSavedPost(postId).unwrap();
                return;
            }

            await addSavedPost(postId).unwrap();
        } catch {
            console.error('Failed to toggle saved post');
        }
    };

    return (
        <button
            type="button"
            className={`${className} blog-actions__button ${isSaved ? 'is-active' : ''}`}
            aria-label={isSaved ? 'Remove from saved posts' : 'Save post'}
            aria-pressed={isSaved}
            onClick={() => void handleToggleSavedPost()}
            disabled={isLoading}
        >
            <span className="blog-actions__icon-wrapper">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.8335 3.33325H14.1668C14.6268 3.33325 15.0002 3.70659 15.0002 4.16659V16.6666L10.0002 13.7499L5.00016 16.6666V4.16659C5.00016 3.70659 5.3735 3.33325 5.8335 3.33325Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </button>
    );
};
