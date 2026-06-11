import { PostCard } from "../PostCard";

const PostList = (props) => {
  const { posts, error } = props;
  
  return (
    <ul className="list">
     <ul className="list">
      {
        error ? (
          <p>Failed to load posts</p>
        ) : (
          posts.map((post) =>
            <PostCard 
          key={post.id}
          post = {post}
          /> 
          )
        )
      }
    </ul>
    </ul>
  );
};
export default PostList;
