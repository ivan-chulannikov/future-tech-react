import { PostCard } from '../PostCard';
import type { PostListProps } from './types/PostListProps';
const PostList = ({ posts, renderActions }: PostListProps) => {
    return (
        <ul className="list">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} actionsSlot={renderActions?.(post)} />
            ))}
        </ul>
    );
};
export default PostList;
