import type { CommentCardProps } from './types/types';
import { formatDateTime } from '@/shared/lib/date';
import { useLayoutEffect, useRef, useState } from 'react';
const CommentsCard = ({ comment }: CommentCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const commentTextRef = useRef<HTMLParagraphElement>(null);
    useLayoutEffect(() => {
        const textElement = commentTextRef.current;

        if (!textElement || isExpanded) {
            return;
        }

        const checkOverflow = () => {
            setIsOverflowing(textElement.scrollHeight > textElement.clientHeight);
        };

        checkOverflow();

        const resizeObserver = new ResizeObserver(checkOverflow);

        resizeObserver.observe(textElement);

        return () => {
            resizeObserver.disconnect();
        };
    }, [comment.content, isExpanded]);

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
            <div className="comment-card__content">
                <p
                    ref={commentTextRef}
                    className={['comment-card__text', isExpanded && 'comment-card__text--expanded']
                        .filter(Boolean)
                        .join(' ')}
                >
                    {comment.content}
                </p>
                {(isOverflowing || isExpanded) && (
                    <button
                        type="button"
                        className="button expandable-content__button"
                        onClick={() => setIsExpanded((previous) => !previous)}
                    >
                        {isExpanded ? 'Cкрыть' : 'Показать'}
                    </button>
                )}
            </div>
        </article>
    );
};
export default CommentsCard;
