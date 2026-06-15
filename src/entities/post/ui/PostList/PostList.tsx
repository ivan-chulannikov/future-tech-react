import { PostCard } from "../PostCard";
import {PostListProps} from "./types/PostListProps"
const PostList = ({posts}: PostListProps) => {

  
  return (
    <ul className="list">
     <ul className="list">
      {
       
          posts.map((post) =>
            <PostCard 
          key={post.id}
          post = {post}
          /> 
          )
       
      }
    </ul>
    </ul>
  );
};
export default PostList;
