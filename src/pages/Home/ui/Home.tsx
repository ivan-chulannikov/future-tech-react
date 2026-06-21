const POSTS_PER_PAGE = 3;
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
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryId = searchParams.get('category') ?? 'all'
  const pageParam = Number(searchParams.get('page'))
  const currentPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam: 1;
  const {
  data: postsResponse,
  isLoading: isPostsLoadingQuery,
  isFetching: isPostsFetching,
  isError: isPostsErrorQuery,
  refetch: refetchPosts
} = useGetPostsQuery({
  categoryId: activeCategoryId,
  page: currentPage,
  limit: POSTS_PER_PAGE,
})
  const posts = postsResponse?.data ?? []
  const totalPages  = postsResponse?.pages ?? 1
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
  isError : isTabsError,
  refetch: refetchTabs,

} = useGetCategoriesQuery()

const tabs = tabsResponse ?? []



  const onPageChange = (page: number) => {
  setSearchParams((prevParams) => {
    const nextParams = new URLSearchParams(prevParams);

    nextParams.set('page', String(page));

    return nextParams;
  });
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
          isPostsFetching = {isPostsFetching}
          isTabsLoading={isTabsLoadingQuery}
          isTabsError={isTabsError}
          onPostsRetry={refetchPosts}
          onTabsRetry={refetchTabs}
          paginationSlot = {
            <Pagination  currentPage  = {currentPage} totalPages = {totalPages} onPageChange = {onPageChange}   />
          }
        />
        
        <ResourcesSection />
        <ReviewsSection />
        <AboutSection />
    </>
  );
};

export default Home;