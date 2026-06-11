import { Footer, Header } from "@/widgets/layout";

import { HeroSection } from "@/widgets/HeroSection";
import { FeaturesSection } from "@/widgets/FeaturesSection";
import { PostsSection } from "@/widgets/PostsSection";
import { ResourcesSection } from "@/widgets/ResourcesSection";
import { ReviewsSection } from "@/widgets/ReviewsSection";
import { AboutSection } from "@/widgets/AboutSection";
import { homePostsSection } from "../model/postSection";
import { posts } from "@/entities/post";

const Home = () => {
  const homePosts = posts.filter((post) => post.showOnHome);
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
