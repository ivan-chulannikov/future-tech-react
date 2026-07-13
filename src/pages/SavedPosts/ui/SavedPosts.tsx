import { useGetPostsQuery } from '@/entities/post/api/postApi';
import { PostList } from '@/entities/post';
import { SavePostButton } from '@/features/save-post';
import { Button } from '@/shared/ui/Button';
import { StateView } from '@/shared/ui/StateView';
import { savedPostsViewContent } from '../model/stateViewPresets';
import { Pagination } from '@/shared/ui/Pagination';
import { usePaginationParams } from '@/shared/lib/pagination/usePaginationParams';
import { useNormalizePaginationPage } from '@/shared/lib/pagination/useNormalizePaginationPage';

const POSTS_PER_PAGE = 3;

export const SavedPosts = () => {
    const { currentPage, handlePageChange } = usePaginationParams();

    const {
        data: savedPostsResponse,
        isLoading: isSavedPostsLoading,
        isError: isSavedPostsError,
        refetch: refetchPosts,
    } = useGetPostsQuery({
        page: currentPage,
        limit: POSTS_PER_PAGE,
        savedOnly: true,
    });

    useNormalizePaginationPage(currentPage, savedPostsResponse?.pages);

    const savedPosts = savedPostsResponse?.data ?? [];
    const totalPages = savedPostsResponse?.pages ?? 1;

    return (
        <main>
            <section className="section">
                <div className="section__body">
                    {isSavedPostsLoading && <StateView {...savedPostsViewContent.loading} />}

                    {!isSavedPostsLoading && isSavedPostsError && (
                        <StateView
                            size="page"
                            {...savedPostsViewContent.error}
                            action={
                                <Button type="button" onClick={() => void refetchPosts()}>
                                    Try Again
                                </Button>
                            }
                        />
                    )}

                    {!isSavedPostsLoading && !isSavedPostsError && savedPosts.length === 0 && (
                        <StateView size="page" {...savedPostsViewContent.empty} />
                    )}

                    {!isSavedPostsLoading && !isSavedPostsError && savedPosts.length > 0 && (
                        <>
                            <PostList
                                posts={savedPosts}
                                renderActions={(post) => (
                                    <li className="blog-actions__item">
                                        <SavePostButton postId={post.id} isSaved={post.isSaved} />
                                    </li>
                                )}
                            />
                            <div className="posts-section__pagination">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
};
