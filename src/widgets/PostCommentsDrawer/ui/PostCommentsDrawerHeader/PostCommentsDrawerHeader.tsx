import type { PostCommentsDrawerHeaderProps } from './types';
import { formatDateTime } from '@/shared/lib/date';
const PostCommentsDrawerHeader = ({ onClose, post }: PostCommentsDrawerHeaderProps) => {
    return (
        <header className="comments-drawer__header">
            <div className="comments-drawer__header-main">
                <p className="comments-drawer__eyebrow">Comments</p>

                <h2 className="comments-drawer__title h5" id="comments-drawer-title">
                    {post.title}
                </h2>

                <p className="comments-drawer__meta">
                    {post.author.name} ·{' '}
                    <time dateTime={post.date}>{formatDateTime(post.date)}</time>
                </p>
            </div>

            <button
                className="comments-drawer__close-button"
                type="button"
                aria-label="Close comments"
                onClick={onClose}
            >
                ×
            </button>
        </header>
    );
};
export default PostCommentsDrawerHeader;
