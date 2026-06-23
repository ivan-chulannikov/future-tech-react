import { useAppSelector } from '@/app/store/hooks';

import { PostPreview } from '@/entities/post/model/types';
import { selectSavedPostIds } from '@/features/save-post';
import { StateView } from '@/shared/ui/StateView';
import { savedPostsViewContent } from '../model/stateViewPresets';
import { SavePostButton } from '@/features/save-post';
import { Button } from '@/shared/ui/Button';
import { PostList, useGetAllPostsQuery } from '@/entities/post';
export const SavedPosts = () => {
    const savedPostIds = useAppSelector(selectSavedPostIds);
    const {
        data: postsResponse,
        isLoading: isSavedPostsLoadingQuery,
        isError: isSavedPostsErrorQuery,
        refetch: refetchSavedPosts,
    } = useGetAllPostsQuery(undefined, {
        skip: savedPostIds.length === 0,
    });

    const savedPostIdsSet = new Set(savedPostIds);
    const posts = postsResponse ?? [];

    const savedPosts = posts.filter((post) => savedPostIdsSet.has(post.id));

    return (
        <main>
            <section className="section">
                <div className="section__body">
                    {/* loading */}
                    {isSavedPostsLoadingQuery && <StateView {...savedPostsViewContent.loading} />}

                    {/* error */}
                    {!isSavedPostsLoadingQuery && isSavedPostsErrorQuery && (
                        <StateView
                            size="page"
                            {...savedPostsViewContent.error}
                            action={
                                <Button type="button" onClick={refetchSavedPosts}>
                                    Try Again
                                </Button>
                            }
                        />
                    )}

                    {/* no saved ids */}
                    {!isSavedPostsLoadingQuery &&
                        !isSavedPostsErrorQuery &&
                        savedPostIds.length === 0 && (
                            <StateView size="page" {...savedPostsViewContent.empty} />
                        )}

                    {/* saved ids есть, но посты не нашлись */}
                    {!isSavedPostsLoadingQuery &&
                        !isSavedPostsErrorQuery &&
                        savedPostIds.length > 0 &&
                        savedPosts.length === 0 && (
                            <StateView {...savedPostsViewContent.errorFindIds} />
                        )}

                    {/* success */}
                    {!isSavedPostsLoadingQuery &&
                        !isSavedPostsErrorQuery &&
                        savedPosts.length > 0 && (
                            <PostList
                                posts={savedPosts}
                                renderActions={(post: PostPreview) => (
                                    <li className="blog-actions__item">
                                        <SavePostButton postId={post.id} />
                                    </li>
                                )}
                            />
                        )}
                </div>
            </section>
        </main>
    );
};
