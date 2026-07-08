import { useState } from 'react';
import { HeroSection } from '@/widgets/HeroSection';
import { FeaturesSection } from '@/widgets/FeaturesSection';
import { PostsSection } from '@/widgets/PostsSection';
import { ResourcesSection } from '@/widgets/ResourcesSection';
import { ReviewsSection } from '@/widgets/ReviewsSection';
import { AboutSection } from '@/widgets/AboutSection';
import { homePostsSection } from '../model/postSection';
import { Pagination } from '@/shared/ui/Pagination';
import { useGetPostsQuery} from '@/entities/post/api/postApi';
import { useGetCategoriesQuery } from '@/entities/category/api/categoriesApi';
import { SavePostButton } from '@/features/save-post';
import { usePaginationParams } from '@/shared/lib/pagination/usePaginationParams';
import { useNormalizePaginationPage } from '@/shared/lib/pagination/useNormalizePaginationPage';
import { usePostCategoryParams } from '@/features/filter-posts-by-category/lib/usePostCategoryParams';
import LikePostButton from '@/features/like-post/ui/LikePostButton/LikePostButton';
import CommentPostButton from '@/features/comment-post/ui/CommentPostButton';
import Drawer from '@/shared/ui/Drawer/Drawer';
const POSTS_PER_PAGE = 3;
const Home = () => {
    const { activeCategoryId, handleCategoryChange } = usePostCategoryParams()
    const { currentPage, handlePageChange } = usePaginationParams();
    const [openedCommentsPostId, setOpenedCommentsPostId] = useState<string | null>(null);

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
    const selectedCommentsPost = posts.find((post) => post.id === openedCommentsPostId);
    console.log(selectedCommentsPost)
    console.log(openedCommentsPostId)
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
                    isActive={openedCommentsPostId === post.id}
                    onClick={() =>
                        setOpenedCommentsPostId((currentPostId) =>
                            currentPostId === post.id ? null : post.id,
                        )
                    }
                />
            </li>
        </>
    )}
/>

{selectedCommentsPost && <Drawer post = {selectedCommentsPost} onClose={() => setOpenedCommentsPostId(null)}/>}

            <ResourcesSection />
            <ReviewsSection />
            <AboutSection />
        </>
    );
};

export default Home;
