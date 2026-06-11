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

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState(false);
  const [tabs, setTabs] = useState<Category[]>([])

  const loadPosts = async () => {
    try {
      setError(false);

      const data = await fetchPosts();

      setPosts(data);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />

        <PostsSection
          sectionHeader={homePostsSection.header}
          posts={posts}
          tabs={homePostsSection.tabs}
          
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