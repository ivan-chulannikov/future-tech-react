import { useAppSelector } from '@/app/store/hooks';
import { selectUser } from '@/features/auth';
import Button from '@/shared/ui/Button';

const Profile = () => {
    const user = useAppSelector(selectUser);
    console.log(user)
    return (

        <main className="profile">
            <section className="profile__hero section">
                <div className="profile__inner container">
                    <div className="profile__card">
                        <div className="profile__top">
                            <div className="profile__avatar" aria-hidden="true">
                                IP
                            </div>

                            <div className="profile__info">
                                <div className="profile__name-row">
                                    <h1 className="profile__name">Ivan Petrov</h1>
                                    <span className="profile__badge">PRO</span>
                                </div>

                                <p className="profile__username">@ivanpetrov</p>

                                <p className="profile__description">
                                    Tech enthusiast, AI explorer and builder. Exploring the future
                                    of technology and its impact on business, society and daily
                                    life.
                                </p>

                                <div className="profile__meta">
                                    <span>Member since Mar 2024</span>
                                    <span>Moscow, Russia</span>
                                </div>
                            </div>

                            <div className="profile__actions">
                                <Button type="button" className="button--accent profile__action">
                                    Create Post
                                </Button>

                                <Button type="button" className="profile__action">
                                    Edit Profile
                                </Button>
                            </div>
                        </div>

                        <ul className="profile__stats">
                            <li className="profile__stat-card">
                                <span className="profile__stat-label">Saved Posts</span>
                                <strong className="profile__stat-value">156</strong>
                            </li>

                            <li className="profile__stat-card">
                                <span className="profile__stat-label">Posts Created</span>
                                <strong className="profile__stat-value">342</strong>
                            </li>

                            <li className="profile__stat-card">
                                <span className="profile__stat-label">Followers</span>
                                <strong className="profile__stat-value">1.2K</strong>
                            </li>

                            <li className="profile__stat-card">
                                <span className="profile__stat-label">Following</span>
                                <strong className="profile__stat-value">89</strong>
                            </li>
                        </ul>

                        <nav className="profile__tabs" aria-label="Profile sections">
                            <button className="profile__tab is-active" type="button">
                                Overview
                            </button>
                            <button className="profile__tab" type="button">
                                Saved Posts
                            </button>
                            <button className="profile__tab" type="button">
                                Activity
                            </button>
                            <button className="profile__tab" type="button">
                                Highlights
                            </button>
                        </nav>

                        <div className="profile__content">
                            <section className="profile__section profile__section--main">
                                <div className="profile__section-header">
                                    <h2 className="profile__section-title">Recent Activity</h2>
                                    <button className="profile__link-button" type="button">
                                        View All
                                    </button>
                                </div>

                                <div className="profile__posts">
                                    <article className="profile-post">
                                        <img
                                            className="profile-post__image"
                                            src="/images/blog-card/1.jpg"
                                            alt=""
                                        />

                                        <div className="profile-post__body">
                                            <time className="profile-post__date">Apr 25, 2024</time>
                                            <h3 className="profile-post__title">
                                                The Quantum Leap in Computing
                                            </h3>
                                            <p className="profile-post__description">
                                                How quantum computing is solving problems that
                                                classical computers cannot.
                                            </p>
                                            <div className="profile-post__meta">
                                                <span>2.1K views</span>
                                                <span>45 comments</span>
                                                <span>289 likes</span>
                                            </div>
                                        </div>

                                        <button className="profile-post__save" type="button">
                                            ★
                                        </button>
                                    </article>

                                    <article className="profile-post">
                                        <img
                                            className="profile-post__image"
                                            src="/images/blog-card/2.jpg"
                                            alt=""
                                        />

                                        <div className="profile-post__body">
                                            <time className="profile-post__date">Apr 22, 2024</time>
                                            <h3 className="profile-post__title">
                                                The Rise of Artificial Intelligence in Healthcare
                                            </h3>
                                            <p className="profile-post__description">
                                                AI is helping detect diseases earlier and improve
                                                patient outcomes.
                                            </p>
                                            <div className="profile-post__meta">
                                                <span>1.8K views</span>
                                                <span>36 comments</span>
                                                <span>230 likes</span>
                                            </div>
                                        </div>

                                        <button className="profile-post__save" type="button">
                                            ★
                                        </button>
                                    </article>

                                    <article className="profile-post">
                                        <img
                                            className="profile-post__image"
                                            src="/images/blog-card/3.jpg"
                                            alt=""
                                        />

                                        <div className="profile-post__body">
                                            <time className="profile-post__date">Apr 18, 2024</time>
                                            <h3 className="profile-post__title">
                                                Sustainable Tech Innovations for a Better Future
                                            </h3>
                                            <p className="profile-post__description">
                                                Discover how new technologies are improving
                                                environmental responsibility.
                                            </p>
                                            <div className="profile-post__meta">
                                                <span>1.3K views</span>
                                                <span>48 comments</span>
                                                <span>184 likes</span>
                                            </div>
                                        </div>

                                        <button className="profile-post__save" type="button">
                                            ★
                                        </button>
                                    </article>
                                </div>
                            </section>

                            <aside className="profile__sidebar">
                                <section className="profile-widget">
                                    <h2 className="profile-widget__title">Reading Progress</h2>

                                    <div className="profile-progress">
                                        <strong className="profile-progress__value">65%</strong>
                                    </div>

                                    <p className="profile-widget__description">
                                        You have read 65% of your saved posts this month.
                                    </p>

                                    <Button type="button" className="profile-widget__button">
                                        View Progress
                                    </Button>
                                </section>

                                <section className="profile-widget">
                                    <h2 className="profile-widget__title">Profile Highlights</h2>

                                    <ul className="profile-widget__list">
                                        <li>
                                            <span>Top Topic</span>
                                            <strong>Artificial Intelligence</strong>
                                        </li>
                                        <li>
                                            <span>Most Read Category</span>
                                            <strong>Future of Tech</strong>
                                        </li>
                                        <li>
                                            <span>Member For</span>
                                            <strong>14 months</strong>
                                        </li>
                                    </ul>
                                </section>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Profile;