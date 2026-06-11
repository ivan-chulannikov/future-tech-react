import { PostCard } from "../PostCard";

const PostList = (props) => {
  const { posts } = props;
  
  return (
    <ul className="list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
};
export default PostList;
