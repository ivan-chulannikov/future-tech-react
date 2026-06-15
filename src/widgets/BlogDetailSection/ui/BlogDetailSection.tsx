import { PostActions } from "@/entities/post";
import { PostDetails } from "@/entities/post/model/types";
import { Fragment } from "react";
import { PostDetailsProps } from "../types/PostDetailsProps";

const BlogDetailSection = ({ post}: PostDetailsProps) => {
  if (!post) {
    return null;
  }

  const { title, date, categoryId, readingTime, author, stats, content } = post;

  return (
    <section className="blog-details">
      <header
        className="blog-details__banner"
        
      >
        <div className="blog-details__inner container">
          <h1 className="blog-details__title">{title}</h1>
        </div>
      </header>

      <div className="blog-details__body">
        <div className="blog-details__body-inner container">
          <div className="blog-details__content">
            <div className="blog-details__intro">
              <h2 className="h6">Introduction</h2>
              <p>{content.introduction}</p>
            </div>

            <div className="blog-details__main expandable-content">
              {content.sections.map((section) => (
                <Fragment key={section.title}>
                  <h2 className="h4">{section.title}</h2>

                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.title}-${index}`}>{paragraph}</p>
                  ))}
                </Fragment>
              ))}

              <button
                type="button"
                className="blog-details__read-full-button button expandable-content__button"
              >
                <span className="icon icon--grey-arrow-down">
                  Read Full Blog
                </span>
              </button>
            </div>
          </div>

          <div className="blog-details__info">
            <PostActions
              likes={stats.likes}
              views={stats.views}
              shares={stats.shares}
            />

            <div className="blog-details__summary summary summary--2-cols">
              <dl className="summary__list">
                <div className="summary__item">
                  <dt className="summary__key">Publication Date</dt>
                  <dd className="summary__value">{date}</dd>
                </div>

                <div className="summary__item">
                  <dt className="summary__key">Category</dt>
                  <dd className="summary__value">{categoryId}</dd>
                </div>

                <div className="summary__item">
                  <dt className="summary__key">Reading Time</dt>
                  <dd className="summary__value">{readingTime}</dd>
                </div>

                <div className="summary__item">
                  <dt className="summary__key">Author Name</dt>
                  <dd className="summary__value">{author.name}</dd>
                </div>

                <div className="summary__item summary__item--wide">
                  <dt className="summary__key">Table of Contents</dt>
                  <dd className="summary__value">
                    <div className="table-of-contents">
                      <ul className="table-of-contents__list">
                        <li className="table-of-contents__item">
                          Introduction
                        </li>

                        {content.sections.map((section) => (
                          <li
                            className="table-of-contents__item"
                            key={section.title}
                          >
                            {section.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-details__news news container">
        <header className="news__header">
          <h2 className="news__title h4">Similar News</h2>
          <a href="#" className="news__link button">
            <span className="icon icon--arrow-yellow">View All News</span>
          </a>
        </header>

        {/* Похожие новости пока можешь оставить статикой ниже */}
      </div>
    </section>
  );
};

export default BlogDetailSection;
