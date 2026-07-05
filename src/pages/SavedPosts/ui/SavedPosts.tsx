

import { PostPreview } from '@/entities/post/model/types';

import { StateView } from '@/shared/ui/StateView';
import { savedPostsViewContent } from '../model/stateViewPresets';
import { SavePostButton } from '@/features/save-post';
import { Button } from '@/shared/ui/Button';
import { PostList } from '@/entities/post';
import { useGetSavedPostsQuery } from '@/entities/post/api/postApi';
export const SavedPosts = () => {
    const savedPosts = []
  const {
    data: savedPostsResponse,
    isLoading: isSavedPostsLoading,
    isFetching: isSavedFetching,
    isError: isSavedPostsError,
    refetch: refetchPosts,

  } = useGetSavedPostsQuery()
  console.log(savedPostsResponse)

    return (
        <main>
            <section className="section">
                <div className="section__body">
                    {/* loading */}
                    {isSavedPostsLoading && <StateView {...savedPostsViewContent.loading} />}

                    {/* error */}
                    {!isSavedPostsLoading && isSavedPostsError && (
                        <StateView
                            size="page"
                            {...savedPostsViewContent.error}
                            action={
                                <Button type="button" onClick={refetchPosts}>
                                    Try Again
                                </Button>
                            }
                        />
                    )}

                    {/* no saved ids */}
                    {!isSavedPostsLoading &&
                        !isSavedPostsError &&
                        savedPostsResponse?.length === 0 && (
                            <StateView size="page" {...savedPostsViewContent.empty} />
                        )}

                    {/* saved ids есть, но посты не нашлись */}
                    {!isSavedPostsLoading &&
                        !isSavedPostsError &&
                        savedPostsResponse?.length > 0 &&
                        savedPostsResponse?.length === 0 && (
                            <StateView {...savedPostsViewContent.errorFindIds} />
                        )}

                    {/* success */}
                    {!isSavedPostsLoading &&
                        !isSavedPostsError &&
                        savedPostsResponse?.length > 0 && (
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
