import { useEffect, useState } from 'react';


import { HeroSection } from '@/widgets/HeroSection';
import { FeaturesSection } from '@/widgets/FeaturesSection';
import { PostsSection } from '@/widgets/PostsSection';
import { ResourcesSection } from '@/widgets/ResourcesSection';
import { ReviewsSection } from '@/widgets/ReviewsSection';
import { AboutSection } from '@/widgets/AboutSection';
import { useSearchParams } from 'react-router-dom';
import { fetchPosts } from '@/entities/post';
import type { Category } from '@/entities/categories';
import { homePostsSection } from '../model/postSection';
import { fetchCategories } from '@/entities/categories/api/categoriesApi';
import { PostPreview } from '@/entities/post/model/types';

const Home = () => {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [error, setError] = useState(false);
  const [tabs, setTabs] = useState<Category[]>([])
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryId = searchParams.get('category') ?? 'all'
  const handleCategoryChange  = (categoryId: string) => {
    if(categoryId === "all"){
      setSearchParams({})
      return;
    }
   
    setSearchParams({category: categoryId})
  }
  const loadTabs = async () => {
  try {
    setError(false);

    const data = await fetchCategories();

    setTabs(data);
  } catch (error) {
    setError(true);
    console.error(error);
  }
};

const loadPosts = async (categoryId: string) => {
  try {
    setError(false);

    const data = await fetchPosts(categoryId);

    setPosts(data);
  } catch (error) {
    setError(true);
    console.error(error);
  }
};

useEffect(() => {
  loadTabs();
}, []);

useEffect(() => {
  loadPosts(activeCategoryId);
}, [activeCategoryId]);

  return (
    <>
        <HeroSection />
        <FeaturesSection />

        <PostsSection
          sectionHeader={homePostsSection.header}
          posts={posts}
          tabs={tabs}
          activeCategoryId = {activeCategoryId}
          handleCategoryChange = {handleCategoryChange}
        />
        <ResourcesSection />
        <ReviewsSection />
        <AboutSection />
    </>
  );
};

export default Home;