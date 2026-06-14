const Header  = () => {
    return (
    <header className="header" data-js-header>
        <div className="header__promo">
           <div className="header__promo-inner container">
                <a href="#" className="header__promo-link">
                    <span className="icon icon--arrow-yellow">Subscribe to our Newsletter For New & latest Blogs and Resources</span>
                </a>
           
           </div>
        </div>
        <div className="header__body">
            <div className="header__body-inner container">
                <a href="/" className="header__logo logo">
                    <img src="/images/logo.svg" alt="" className="logo__image"
                    aria-label="Logo"
                    title="Logo"
                    width="179"
                    height="50"
                    />
                </a>
                <div className="header__overlay" data-js-header-overlay>
                    <nav className="header__menu">
                        <ul className="header__menu-list">
                            <li className="header__menu-item">
                                <a href="./index.html" className="header__menu-link is-active">Home</a>
                            </li>
                            <li className="header__menu-item"><a href="./news.html" className="header__menu-link">News</a></li>
                            <li className="header__menu-item"><a href="./podcast.html" className="header__menu-link">Podcasts</a></li>
                            <li className="header__menu-item"><a href="./resources.html" className="header__menu-link">Resources</a></li>
                        </ul>
                        
                    </nav>
                    <a href="/contacts.html" className="header__contact-us-link button button--accent">
                        Contact Us
                    </a>
                </div>
                <button className="header__burger-button burger-button visible-mobile"
                type="button" aria-label="Open menu" title="Open Menu" data-js-header-burger-button>
                    <span className="burger-button__line">

                    </span>
                    <span className="burger-button__line">
                        
                    </span>
                    <span className="burger-button__line">
                        
                    </span>
                </button>
            </div>
        </div>

    </header>

    )
}
export default Header