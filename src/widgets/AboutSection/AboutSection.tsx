const AboutSection = () => {
    return (
        <section className="about">
            <div className="about__inner container">
                <header className="about__header">
                    <img
                        width="150"
                        height="150"
                        src="/icons/about/about-logo.svg"
                        alt=""
                        className="about__icon"
                    />
                    <div className="about__info">
                        <p className="about__subtitle tag">Learn, Connect, and Innovate</p>
                        <h2 className="about__title">Be Part of the Future Tech Revolution</h2>
                    </div>
                    <div className="about__desc">
                        <p>
                            Immerse yourself in the world of future technology. Explore our
                            comprehensive resources, connect with fellow tech enthusiasts, and drive
                            innovation in the industry. Join a dynamic community of
                            forward-thinkers.
                        </p>
                    </div>
                </header>

                <ul className="about__list">
                    <li className="about__item">
                        <a href="#" className="about-card tile">
                            <h3 className="about-card__title icon-circle">Resource Access</h3>
                            <p className="about-card__desc">
                                Visitors can access a wide range of resources, including ebooks,
                                whitepapers, reports.
                            </p>
                        </a>
                    </li>
                    <li className="about__item">
                        <a href="#" className="about-card tile">
                            <h3 className="about-card__title icon-circle">Resource Access</h3>
                            <p className="about-card__desc">
                                Visitors can access a wide range of resources, including ebooks,
                                whitepapers, reports.
                            </p>
                        </a>
                    </li>
                    <li className="about__item">
                        <a href="#" className="about-card tile">
                            <h3 className="about-card__title icon-circle">Resource Access</h3>
                            <p className="about-card__desc">
                                Visitors can access a wide range of resources, including ebooks,
                                whitepapers, reports.
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
};
export default AboutSection;
