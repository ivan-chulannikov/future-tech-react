import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AboutSection from '@/widgets/AboutSection';
import BlogDetailSection from '@/widgets/BlogDetailSection';
import { NotFound } from '@/pages/NotFound';

import { fetchPostById } from '@/entities/post';
import type { PostDetails } from '@/entities/post/model/types';

const BlogDetails = () => {
  const [post, setPost] = useState<PostDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { id } = useParams<{ id: string }>();

  const loadPost = async (postId: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setPost(null);

      const post = await fetchPostById(postId);

      setPost(post);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setPost(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    loadPost(id);
  }, [id]);

  if (isLoading) {
    return (
      <section className="section container">
        <h1>Loading...</h1>
      </section>
    );
  }

  if (isError || !post) {
    return <NotFound />;
  }

  return (
    <>
      <BlogDetailSection post={post} />
      <AboutSection />
    </>
  );
};

export default BlogDetails;