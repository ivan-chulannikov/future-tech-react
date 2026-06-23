import { Button } from '@/shared/ui/Button';
import PostActions from '../PostActions';
import type { PostCardProps } from './types/types';
import { getBlogDetailsRoute } from '@/shared/config/routes';
const PostCard = ({ post, actionsSlot }: PostCardProps) => {
    const { id, author, date, title, description, stats } = post;

    return (
        <li className="list__item">
            <article className="blog-card container">
                <div className="blog-card__author person-card">
                    <img
                        src={author.avatar.src}
                        alt={author.avatar.alt}
                        width={author.avatar.width}
                        height={author.avatar.height}
                        loading="lazy"
                    />

                    <div className="person-card__body">
                        <p className="person-card__name">{author.name}</p>
                    </div>
                </div>

                <div className="blog-card__body">
                    <time dateTime={date} className="blog-card__date h6">
                        {date}
                    </time>

                    <div className="blog-card__info">
                        <h4 className="blog-card__title">{title}</h4>
                        <div className="blog-card__desc">{description}</div>
                    </div>

                    <PostActions
                        className="blog-card__actions"
                        likes={stats.likes}
                        views={stats.views}
                        shares={stats.shares}
                    >
                        {actionsSlot}
                    </PostActions>
                </div>

                <Button
                    to={getBlogDetailsRoute(id)}
                    className="blog-card__link"
                    icon="arrow-yellow"
                >
                    View Blog
                </Button>
            </article>
        </li>
    );
};

export default PostCard;
