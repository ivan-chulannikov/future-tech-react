import type { DrawerProps } from "./types"

const Drawer = ({onClose, post}: DrawerProps) => {
    return (
        <aside
    className="comments-drawer"
    aria-labelledby="comments-drawer-title"
>
    <header className="comments-drawer__header">
        <div className="comments-drawer__header-main">
            <p className="comments-drawer__eyebrow">Comments</p>

            <h2 className="comments-drawer__title h5" id="comments-drawer-title">
                Test Post 27
            </h2>

            <p className="comments-drawer__meta">
                Michael Stone · <time dateTime="2024-03-28">2024-03-28</time>
            </p>
        </div>

        <button
            className="comments-drawer__close-button"
            type="button"
            aria-label="Close comments"
        >
            ×
        </button>
    </header>

    <div className="comments-drawer__summary">
        <span className="comments-drawer__summary-icon" aria-hidden="true">
            💬
        </span>
        <span>27000 comments</span>
    </div>

    <section className="comments-drawer__form-section" aria-label="Add comment">
        <form className="comments-form">
            <label className="visibility-hidden" htmlFor="comment-text">
                Write a comment
            </label>

            <textarea
                className="comments-form__textarea"
                id="comment-text"
                name="comment"
                placeholder="Write a comment..."
                maxLength={500}
            />

            <div className="comments-form__footer">
                <span className="comments-form__counter">0/500</span>

                <button className="comments-form__submit" type="submit">
                    Send
                </button>
            </div>
        </form>
    </section>

    <section className="comments-drawer__list-section" aria-labelledby="comments-list-title">
        <h3 className="visibility-hidden" id="comments-list-title">
            Comments list
        </h3>

        <ul className="comments-list">
            <li className="comments-list__item">
                <article className="comment-card">
                    <header className="comment-card__header">
                        <div className="comment-card__author">
                            <span className="comment-card__avatar" aria-hidden="true">
                                MS
                            </span>

                            <div className="comment-card__author-info">
                                <h4 className="comment-card__author-name">Michael Stone</h4>
                                <time className="comment-card__date" dateTime="2026-07-08">
                                    2 minutes ago
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

                    <p className="comment-card__text">
                        This is a useful article. Thanks for sharing your insights!
                    </p>
                </article>
            </li>

            <li className="comments-list__item">
                <article className="comment-card">
                    <header className="comment-card__header">
                        <div className="comment-card__author">
                            <span className="comment-card__avatar" aria-hidden="true">
                                EW
                            </span>

                            <div className="comment-card__author-info">
                                <h4 className="comment-card__author-name">Dr. Emily Walker</h4>
                                <time className="comment-card__date" dateTime="2026-07-08">
                                    5 minutes ago
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

                    <p className="comment-card__text">
                        Great point. I especially agree with the part about scalability.
                    </p>
                </article>
            </li>

            <li className="comments-list__item">
                <article className="comment-card">
                    <header className="comment-card__header">
                        <div className="comment-card__author">
                            <span className="comment-card__avatar" aria-hidden="true">
                                ID
                            </span>

                            <div className="comment-card__author-info">
                                <h4 className="comment-card__author-name">Ivan Don</h4>
                                <time className="comment-card__date" dateTime="2026-07-08">
                                    12 minutes ago
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

                    <p className="comment-card__text">
                        Very interesting read. Looking forward to more posts like this!
                    </p>

                    <footer className="comment-card__footer">
                        <button className="comment-card__delete-button" type="button">
                            Delete
                        </button>
                    </footer>
                </article>
            </li>
        </ul>
    </section>
</aside>
    )
}
export default Drawer