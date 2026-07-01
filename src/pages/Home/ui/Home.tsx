import { HeroSection } from '@/widgets/HeroSection';
import { FeaturesSection } from '@/widgets/FeaturesSection';
import { PostsSection } from '@/widgets/PostsSection';
import { ResourcesSection } from '@/widgets/ResourcesSection';
import { ReviewsSection } from '@/widgets/ReviewsSection';
import { AboutSection } from '@/widgets/AboutSection';
import { useSearchParams } from 'react-router-dom';
import { homePostsSection } from '../model/postSection';
import { Pagination } from '@/shared/ui/Pagination';
import { useGetPostsQuery } from '@/entities/post/api/postApi';
import { useGetCategoriesQuery } from '@/entities/category/api/categoriesApi';
import { SavePostButton } from '@/features/save-post';
import { getValidPage } from '../helpers/getValidPage';
import { clampPage } from '../helpers/clampPage'
import {useEffect} from 'react'
const POSTS_PER_PAGE = 3;
const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategoryId = searchParams.get('category') ?? 'all';
    const pageParam = searchParams.get('page');
    const currentPage = getValidPage(pageParam); 
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
  
    const totalPagesFromResponse = postsResponse?.pages;
    const totalPages = totalPagesFromResponse ?? 1;
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

    const handlePageChange = (page: number) => {
        setSearchParams((prevParams) => {
            const nextParams = new URLSearchParams(prevParams);

            nextParams.set('page', String(page));

            return nextParams;
        });
    };
    useEffect(() => {
        if (totalPagesFromResponse === undefined) {
            return;
        }

        const validPage = clampPage(currentPage, totalPagesFromResponse);

        if (validPage !== currentPage) {
            setSearchParams((prevParams) => {
                const nextParams = new URLSearchParams(prevParams);

                nextParams.set('page', String(validPage));

                return nextParams;
            });
        }
    }, [currentPage, totalPagesFromResponse, setSearchParams]);
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
                onPostsRetry={refetchPosts}
                onTabsRetry={refetchTabs}
                paginationSlot={
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                }
                renderPostActions={(post) => (
                    <li className="blog-actions__item">
                        <SavePostButton postId={post.id} />
                    </li>
                )}
            />

            <ResourcesSection />
            <ReviewsSection />
            <AboutSection />
        </>
    );
};

export default Home;
