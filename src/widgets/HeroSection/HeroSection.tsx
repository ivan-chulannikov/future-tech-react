const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero__main container">
                <div className="hero__body">
                    <p className="hero__subtitle">Your Journey to Tomorrow Begins Here</p>
                    <h1 className="hero__title">
                        Explore the Frontiers of Artificial Intelligence
                    </h1>
                    <p className="hero__desc">
                        Welcome to the epicenter of AI innovation. FutureTech AI News is your
                        passport to a world where machines think, learn, and reshape the future.
                        Join us on this visionary expedition into the heart of AI.
                    </p>
                </div>
                <div className="hero__metrics metrics full-vw-line full-vw-line--top full-vw-line--left">
                    <dl className="metrics__list">
                        <div className="metrics__item">
                            <dt className="metrics__key">Resources available</dt>
                            <dd className="metrics__value h3">
                                300<span className="metrics__sign">+</span>
                            </dd>
                        </div>
                        <div className="metrics__item">
                            <dt className="metrics__key">Total Downloads</dt>
                            <dd className="metrics__value h3">
                                12k<span className="metrics__sign">+</span>
                            </dd>
                        </div>
                        <div className="metrics__item">
                            <dt className="metrics__key">Active Users</dt>
                            <dd className="metrics__value h3">
                                10ks<span className="metrics__sign">+</span>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="hero__resources-preview resources-preview">
                    <div className="resources-preview__team team">
                        <img
                            className="team__person"
                            src="/images/team/1.png"
                            width="60"
                            height="60"
                            loading="lazy"
                            alt=""
                        />
                        <img
                            className="team__person"
                            src="/images/team/2.png"
                            width="60"
                            height="60"
                            loading="lazy"
                            alt=""
                        />
                        <img
                            className="team__person"
                            src="/images/team/3.png"
                            width="60"
                            height="60"
                            loading="lazy"
                            alt=""
                        />
                        <img
                            className="team__person"
                            src="/images/team/4.png"
                            width="60"
                            height="60"
                            loading="lazy"
                            alt=""
                        />
                    </div>
                    <div className="resources-preview__body">
                        <p className="resources-preview__title h5">Explore 1000+ resources</p>
                        <p className="resources-preview__subtitle">
                            Over 1,000 articles on emerging tech trends and breakthroughs.
                        </p>
                    </div>
                    <a href="#" className="resources-preview__button button">
                        <span className="icon icon--arrow-yellow">Explore Resources</span>
                    </a>
                </div>
            </div>
            <div className="hero__advantages container">
                <ul className="hero__advantages-list">
                    <li className="hero__advantages-item">
                        <div className="advantage-card">
                            <img
                                src="/icons/updates-icon.svg"
                                width="50"
                                height="50"
                                alt=""
                                className="advantage-card__icon"
                            />
                            <a href="" className="advantage-card__link icon-circle">
                                <h3 className="advantage-card__title h6">Latest News Updates</h3>
                                <p className="advantage-card__subtitle">Stay Current</p>
                            </a>
                            <p className="advantage-card__details">
                                Over 1,000 articles published monthly
                            </p>
                        </div>
                    </li>
                    <li className="hero__advantages-item">
                        <div className="advantage-card">
                            <img
                                src="/icons/contributors-icon.svg"
                                width="50"
                                height="50"
                                alt=""
                                className="advantage-card__icon"
                            />
                            <a href="" className="advantage-card__link icon-circle">
                                <h3 className="advantage-card__title h6">Expert Contributors</h3>
                                <p className="advantage-card__subtitle">Trusted Insights</p>
                            </a>
                            <p className="advantage-card__details">
                                50+ renowned AI experts on our team
                            </p>
                        </div>
                    </li>
                    <li className="hero__advantages-item">
                        <div className="advantage-card">
                            <img
                                src="/icons/readership-icon.svg"
                                width="50"
                                height="50"
                                alt=""
                                className="advantage-card__icon"
                            />
                            <a href="" className="advantage-card__link icon-circle">
                                <h3 className="advantage-card__title h6">Global Readership</h3>
                                <p className="advantage-card__subtitle">Worldwide Impact</p>
                            </a>
                            <p className="advantage-card__details">2 million monthly readers</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};
export default HeroSection;
