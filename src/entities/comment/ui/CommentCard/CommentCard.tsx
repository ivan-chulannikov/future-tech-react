import type { CommentCardProps } from './types/types';
import { formatDateTime } from '@/shared/lib/date';

const CommentsCard = ({ comment }: CommentCardProps) => {
    return (
        <article className="comment-card">
            <header className="comment-card__header">
                <div className="comment-card__author">
                    <span className="comment-card__avatar" aria-hidden="true">
                        MS
                    </span>

                    <div className="comment-card__author-info">
                        <h4 className="comment-card__author-name">{comment.author.username}</h4>
                        <time className="comment-card__date" dateTime={comment.createdAt}>
                            {formatDateTime(comment.createdAt)}
                        </time>
                    </div>
                </div>

                <button
                    className="comment-card__menu-button"
                    type="button"
                    aria-label="Open comment menu"
                >
                    ···
                </button>
            </header>

            <p className="comment-card__text">{comment.content}</p>
        </article>
    );
};
export default CommentsCard;
