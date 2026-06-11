import { useEffect, useState } from 'react';

import { Footer, Header } from '@/widgets/layout';
import { HeroSection } from '@/widgets/HeroSection';
import { FeaturesSection } from '@/widgets/FeaturesSection';
import { PostsSection } from '@/widgets/PostsSection';
import { ResourcesSection } from '@/widgets/ResourcesSection';
import { ReviewsSection } from '@/widgets/ReviewsSection';
import { AboutSection } from '@/widgets/AboutSection';

import { fetchPosts } from '@/entities/post';
import type { Post } from '@/entities/post';
import type { Category } from '@/entities/categories';
import { homePostsSection } from '../model/postSection';
import { fetchCategories } from '@/entities/categories/api/categoriesApi';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState(false);
  const [tabs, setTabs] = useState<Category[]>([])
  const [activeCategoryId, setActiveCategoryId] = useState("all");
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
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />

        <PostsSection
          sectionHeader={homePostsSection.header}
          posts={posts}
          tabs={tabs}
          activeCategoryId = {activeCategoryId}
          onCategoryChange = {setActiveCategoryId}
        />
        <ResourcesSection />
        <ReviewsSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;