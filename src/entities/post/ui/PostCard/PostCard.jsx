import { Button } from "@/shared/ui/Button";
import PostActions from "../PostActions";

const PostCard = ({ post }) => {
  const {
    author,
    category,
    date,
    title,
    description,
    href,
    stats,
  } = post;

  return (
    <li className="list__item">
      <article className="blog-card container">
        <div className="blog-card__author person-card">
          <img
            src={author.image}
            width="80"
            height="80"
            alt={author.name}
          />

          <div className="person-card__body">
            <p className="person-card__name">{author.name}</p>
            <p className="person-card__topic">{category.label}</p>
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
          />
        </div>

        <Button href={href} className="blog-card__link" icon="arrow-yellow">
          View Blog
        </Button>
      </article>
    </li>
  );
};

export default PostCard;