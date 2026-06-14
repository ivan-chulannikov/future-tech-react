import { useState, useEffect } from "react";
import AboutSection from "@/widgets/AboutSection";
import BlogDetailSection from "@/widgets/BlogDetailSection";
import { Footer, Header } from "@/widgets/layout";
import {Post } from "@/entities/post";
import { useParams } from "react-router-dom";
import { fetchPostById } from "@/entities/post";

const BlogDetails = () => {
  const [post, setPost] = useState<Post|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const { id } = useParams()
  const loadPost = async (postId: string) => {
    try {
      setIsError(false)
      setIsLoading(true)
      const post = await fetchPostById(postId)
      setPost(post)
    } catch(error) {
      console.error(error)
      setIsError(true)

    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if(!id) return 
    loadPost(id)
  },[id])
  
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
