export { default as  PostCard } from "./ui/PostCard";
export {default as  PostList } from "./ui/PostList";
export { default as PostActions} from "./ui/PostActions"
export { posts, getPostById, getFilteredPosts  } from "./model";
export { fetchPosts } from "./api/postApi"
export { isPostArray, isPost } from "./model/guard"
export type {ArticleType, Author, Stats, Post} from "./model/types"