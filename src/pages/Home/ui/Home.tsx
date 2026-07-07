import { HeroSection } from '@/widgets/HeroSection';
import { FeaturesSection } from '@/widgets/FeaturesSection';
import { PostsSection } from '@/widgets/PostsSection';
import { ResourcesSection } from '@/widgets/ResourcesSection';
import { ReviewsSection } from '@/widgets/ReviewsSection';
import { AboutSection } from '@/widgets/AboutSection';
import { useSearchParams } from 'react-router-dom';
import { homePostsSection } from '../model/postSection';
import { Pagination } from '@/shared/ui/Pagination';
import { useGetPostsQuery, useGetSavedPostsQuery  } from '@/entities/post/api/postApi';
import { useGetCategoriesQuery } from '@/entities/category/api/categoriesApi';
import { SavePostButton } from '@/features/save-post';
import { useAppSelector } from '@/app/store/hooks';
import { selectToken } from '@/features/auth/model/selectors';
import { usePaginationParams } from '@/shared/lib/pagination/usePaginationParams';
import { useNormalizePaginationPage } from '@/shared/lib/pagination/useNormalizePaginationPage';
const POSTS_PER_PAGE = 3;
const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const accessToken = useAppSelector(selectToken);
    const activeCategoryId = searchParams.get('category') ?? 'all';
   const { currentPage, handlePageChange } = usePaginationParams();

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

const { data: savedPosts = [] } = useGetSavedPostsQuery(undefined, {
    skip: !accessToken,
});

const totalPages = postsResponse?.pages ?? 1;
const posts = postsResponse?.data ?? [];
    const handleCategoryChange = (categoryId: string) => {
        if (categoryId === 'all') {
            setSearchParams({
                page: '1',
            });
            return;
        }
        setSearchParams({
            category: categoryId,
            page: '1',
        });
    };

    const {
        data: tabsResponse,
        isLoading: isTabsLoadingQuery,
        isError: isTabsError,
        refetch: refetchTabs,
    } = useGetCategoriesQuery();

    const tabs = tabsResponse ?? [];

    
    
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
                renderPostActions={(post) => {
                    const isSaved = savedPosts.some((savedPost) => savedPost.id === post.id)
                      return (
                        <li className="blog-actions__item">
                            <SavePostButton postId={post.id} isSaved={isSaved} />
                        </li>
                        );
                }
                
                }
            />

            <ResourcesSection />
            <ReviewsSection />
            <AboutSection />
        </>
    );
};

export default Home;
