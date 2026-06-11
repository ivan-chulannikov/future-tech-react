import { Footer, Header } from "@/widgets/layout";

import { HeroSection } from "@/widgets/HeroSection";
import { FeaturesSection } from "@/widgets/FeaturesSection";
import { PostsSection } from "@/widgets/PostsSection";
import { ResourcesSection } from "@/widgets/ResourcesSection";
import { ReviewsSection } from "@/widgets/ReviewsSection";
import { AboutSection } from "@/widgets/AboutSection";
import { homePostsSection } from "../model/postSection";
<<<<<<< Updated upstream:src/pages/Home/ui/Home.jsx
import { posts } from "@/entities/post";

const Home = () => {
  const homePosts = posts.filter((post) => post.showOnHome);
=======

import { fetchPosts } from "@/entities/post/api/postApi";
import { useEffect, useState } from "react";
import type { Post } from "../../../entities/post/model/types";
const Home = () => {
  const [posts,setPosts] = useState<Post[]>([])
  const [error,setError] = useState(false)
  
  const loadPosts = async () => {
    try {
      setError(false)
      const data = await fetchPosts()

      setPosts(data)
    } catch(error) {
      console.error(error)
      setError(true)

    } 
  }
  useEffect(() =>{
    loadPosts()
  },[])
>>>>>>> Stashed changes:src/pages/Home/ui/Home.tsx
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />

        <PostsSection
          sectionHeader={homePostsSection.header}
          posts={homePosts}
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
