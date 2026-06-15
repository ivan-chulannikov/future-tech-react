import { Link, NavLink} from "react-router-dom"
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
                <Link to="/" className="header__logo logo" aria-label="Go to home page">
                    <img
                        src="/images/logo.svg"
                        alt=""
                        className="logo__image"
                        title="Logo"
                        width="179"
                        height="50"
                    />
                </Link>
                <div className="header__overlay" data-js-header-overlay>
                    <nav className="header__menu">
                        <ul className="header__menu-list">
                            <li className="header__menu-item">
                                <NavLink to="/" end  className={({isActive}) =>  isActive ? "header__menu-link is-active" : "header__menu-link"}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="header__menu-item"><Link to="./news.html" className="header__menu-link">News</Link></li>
                            <li className="header__menu-item"><Link to="./podcast.html" className="header__menu-link">Podcasts</Link></li>
                            <li className="header__menu-item"><Link to="./resources.html" className="header__menu-link">Resources</Link></li>
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