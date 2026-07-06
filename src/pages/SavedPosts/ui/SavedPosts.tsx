import type { PostPreview } from '@/entities/post/model/types';

import { useGetSavedPostsQuery } from '@/entities/post/api/postApi';
import { PostList } from '@/entities/post';
import { SavePostButton } from '@/features/save-post';
import { Button } from '@/shared/ui/Button';
import { StateView } from '@/shared/ui/StateView';
import { savedPostsViewContent } from '../model/stateViewPresets';

export const SavedPosts = () => {
    const {
        data: savedPostsResponse,
        isLoading: isSavedPostsLoading,
        isError: isSavedPostsError,
        refetch: refetchPosts,
    } = useGetSavedPostsQuery();

    const savedPosts = savedPostsResponse ?? [];
   
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
                        <PostList
                            posts={savedPosts}
                        
                            renderActions={(post: PostPreview) => {
                                    const isSaved = savedPosts.some((savedPost) => savedPost.id === post.id);
                                return (
                                     <li className="blog-actions__item">
                                    <SavePostButton

                                    postId={post.id} isSaved={true} />
                                </li>
                                )
                            }
                                
                               
                            }
                        />
                    )}
                </div>
            </section>
        </main>
    );
};