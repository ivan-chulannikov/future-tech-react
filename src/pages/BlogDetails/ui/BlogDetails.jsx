import AboutSection from "@/widgets/AboutSection";
import BlogDetailSection from "@/widgets/BlogDetailSection";
import { Footer, Header } from "@/widgets/layout";
import {getPostById } from "@/entities/post";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
    const {id} = useParams()
    const post = getPostById(id)
  if (!post) {
    return (
      <>
        <Header />
        <main className="main">
          <section className="section container">
            <h1>Post not found</h1>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="main">
        <BlogDetailSection post={post} />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
};
export default BlogDetails;
