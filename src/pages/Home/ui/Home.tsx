import { useEffect, useState } from 'react';
import { HeroSection } from '@/widgets/HeroSection';
import { FeaturesSection } from '@/widgets/FeaturesSection';
import { PostsSection } from '@/widgets/PostsSection';
import { ResourcesSection } from '@/widgets/ResourcesSection';
import { ReviewsSection } from '@/widgets/ReviewsSection';
import { AboutSection } from '@/widgets/AboutSection';
import { homePostsSection } from '../model/postSection';
import { Pagination } from '@/shared/ui/Pagination';
import { useGetPostsQuery } from '@/entities/post';
import { useGetCategoriesQuery } from '@/entities/category';
import { SavePostButton } from '@/features/save-post';
import { usePaginationParams } from '@/shared/lib/pagination';
import { useNormalizePaginationPage } from '@/shared/lib/pagination';
import { usePostCategoryParams } from '@/features/filter-posts-by-category';
import { LikePostButton } from '@/features/like-post';
import CommentPostButton from '@/features/comment-post/ui/CommentPostButton';
import { PostCommentsDrawer } from '@/widgets/PostCommentsDrawer';
import type { PostPreview } from '@/entities/post';
const POSTS_PER_PAGE = 3;
const Home = () => {
    const { activeCategoryId, handleCategoryChange } = usePostCategoryParams();
    const { currentPage, handlePageChange } = usePaginationParams();
    const [selectedCommentsPost, setSelectedCommentsPost] = useState<PostPreview | null>(null);
    const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);

    const {
        data: postsResponse,
        isLoading: isPostsLoadingQuery,
        isFetching: isPostsFetching,
        isError: isPostsErrorQuery,
        refetch: refetchPosts,
    } = useGetPostsQuery({
        categoryId: activeCategoryId,
        page: currentPage,
        limit: POSTS_PER_PAGE,
    });

    useNormalizePaginationPage(currentPage, postsResponse?.pages);

    const totalPages = postsResponse?.pages ?? 1;
    const posts = postsResponse?.data ?? [];

    const {
        data: tabsResponse,
        isLoading: isTabsLoadingQuery,
        isError: isTabsError,
        refetch: refetchTabs,
    } = useGetCategoriesQuery();

    const tabs = tabsResponse ?? [];

    const handleCommentsClick = (post: PostPreview) => {

        const isSamePost = selectedCommentsPost?.id === post.id;

        if (isSamePost && isCommentsDrawerOpen) {
            setIsCommentsDrawerOpen(false);
            return;
        }

        setSelectedCommentsPost(post);
        setIsCommentsDrawerOpen(true);
    };

    return (
        <>
            <HeroSection />
            <FeaturesSection />

            <PostsSection
                sectionHeader={homePostsSection.header}
                posts={posts}
                tabs={tabs}
                activeCategoryId={activeCategoryId}
                handleCategoryChange={handleCategoryChange}
                isPostsLoading={isPostsLoadingQuery}
                isPostsError={isPostsErrorQuery}
                isPostsFetching={isPostsFetching}
                isTabsLoading={isTabsLoadingQuery}
                isTabsError={isTabsError}
                onPostsRetry={() => void refetchPosts()}
                onTabsRetry={() => void refetchTabs()}
                paginationSlot={
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                }
                renderPostActions={(post) => (
                    <>
                        <li className="blog-actions__item">
                            <SavePostButton postId={post.id} isSaved={post.isSaved} />
                        </li>

                        <li className="blog-actions__item">
                            <LikePostButton
                                likes={post.stats.likes}
                                postId={post.id}
                                isLiked={post.isLiked}
                            />
                        </li>

                        <li className="blog-actions__item">
                            <CommentPostButton
                                isActive={
                                    isCommentsDrawerOpen && selectedCommentsPost?.id === post.id
                                }
                                comments={post.stats.comments}
                                onClick={() => handleCommentsClick(post)}
                            />
                        </li>
                    </>
                )}
            />

            <PostCommentsDrawer
                isOpen={isCommentsDrawerOpen}
                post={selectedCommentsPost}
                onClose={() => setIsCommentsDrawerOpen(false)}
            />

            <ResourcesSection />
            <ReviewsSection />
            <AboutSection />
        </>
    );
};

export default Home;
