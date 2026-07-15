import { skipToken } from '@reduxjs/toolkit/query/react';
import { CommentList, useGetPostCommentsQuery } from '@/entities/comment';
import { CommentForm } from '@/features/add-comment';
import { Button } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { StateView } from '@/shared/ui/StateView';
import PostCommentsDrawerHeader from '../PostCommentsDrawerHeader/PostCommentsDrawerHeader';
import { commentsStateViewContent } from './model/stateViewPresets';
import type { PostCommentsDrawerProps } from './types';
import { useEffect, useLayoutEffect } from 'react';
import Overlay from '@/shared/ui/Overlay/Overlay';
const PostCommentsDrawer = ({ post, onClose, isOpen }: PostCommentsDrawerProps) => {
    const postId = post?.id;

    const {
        data: commentsPostResponse,
        isLoading,
        isError,
        refetch,
    } = useGetPostCommentsQuery(postId ?? skipToken);

    const comments = commentsPostResponse?.data ?? [];
    useLayoutEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);
    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <>
            <aside
                className={`comments-drawer ${isOpen ? 'comments-drawer--open' : ''}`}
                aria-labelledby={post ? 'comments-drawer-title' : undefined}
                aria-hidden={!isOpen}
                inert={!isOpen}
            >
                {post && (
                    <Drawer>
                        <PostCommentsDrawerHeader post={post} onClose={onClose} />

                        <div className="comments-drawer__summary">
                            <span className="comments-drawer__summary-icon" aria-hidden="true">
                                💬
                            </span>

                            <span>{post.stats.comments} comments</span>
                        </div>

                        <CommentForm postId={post.id} />

                        {isLoading && (
                            <StateView
                                size="section"
                                className="comments-drawer__state"
                                {...commentsStateViewContent.loading}
                            />
                        )}

                        {!isLoading && isError && (
                            <StateView
                                size="section"
                                className="comments-drawer__state"
                                {...commentsStateViewContent.error}
                                action={
                                    <Button type="button" onClick={() => void refetch()}>
                                        Try Again
                                    </Button>
                                }
                            />
                        )}

                        {!isLoading && !isError && comments.length === 0 && (
                            <StateView
                                size="section"
                                className="comments-drawer__state"
                                {...commentsStateViewContent.empty}
                            />
                        )}

                        {!isLoading && !isError && comments.length > 0 && (
                            <CommentList comments={comments} />
                        )}
                    </Drawer>
                )}
            </aside>
            <Overlay isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default PostCommentsDrawer;
