const ReviewCard = () => {
    return (
        <li className="bordered-grid__item">
            <div className="review-card">
                <div className="review-card__author person-card">
                    <img
                        src="/images/blog/1.png"
                        alt=""
                        className="person-card__image"
                        width="60"
                        height="60"
                    />
                    <div className="person-card__body">
                        <p className="person-card__name">John Techson</p>
                        <p className="person-card__topic">Quantum Computing</p>
                    </div>
                </div>
                <div className="review-card__info tile">
                    <div className="review-card__rating-view rating-view">
                        <div className="rating-view__star is-active" />
                        <div className="rating-view__star is-active" />
                        <div className="rating-view__star is-active" />
                        <div className="rating-view__star is-active" />
                        <div className="rating-view__star is-active" />
                    </div>
                    <blockquote className="rating-view__desc">
                        <p>
                            The ebooks on AI in education have been a game-changer for my research.
                            They provide in-depth insights and case studies that are invaluable for
                            staying updated.
                        </p>
                    </blockquote>
                </div>
            </div>
        </li>
    );
};
export default ReviewCard;
