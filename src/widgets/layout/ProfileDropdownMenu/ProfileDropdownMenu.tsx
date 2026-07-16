import { NavLink } from 'react-router-dom';

import { AppRoutes } from '@/shared/config/routes';

import { profileDropdownIcons } from './ProfileDropdownIcons';
import type { ProfileDropdownMenuProps } from './types/types';
const ProfileDropdownMenu = ({ handleLogOut, className }: ProfileDropdownMenuProps) => {
    const menuClassName = ['profile-dropdown__menu', className].filter(Boolean).join(' ');

    return (
        <div className={menuClassName}>
            <ul className="profile-dropdown__list">
                <li className="profile-dropdown__item">
                    <NavLink
                        to={AppRoutes.profile}
                        className={({ isActive }) =>
                            isActive ? 'profile-dropdown__link is-active' : 'profile-dropdown__link'
                        }
                    >
                        <span className="profile-dropdown__icon" aria-hidden="true">
                            {profileDropdownIcons.profile}
                        </span>
                        <span>Profile</span>
                    </NavLink>
                </li>

                <li className="profile-dropdown__item">
                    <NavLink
                        to={AppRoutes.savedPosts}
                        className={({ isActive }) =>
                            isActive ? 'profile-dropdown__link is-active' : 'profile-dropdown__link'
                        }
                    >
                        <span className="profile-dropdown__icon" aria-hidden="true">
                            {profileDropdownIcons.saved}
                        </span>
                        <span>Saved Posts</span>
                    </NavLink>
                </li>

                <li className="profile-dropdown__item">
                    <NavLink
                        to={AppRoutes.createPost}
                        className={({ isActive }) =>
                            isActive ? 'profile-dropdown__link is-active' : 'profile-dropdown__link'
                        }
                    >
                        <span className="profile-dropdown__icon" aria-hidden="true">
                            {profileDropdownIcons.create}
                        </span>
                        <span>Create Post</span>
                    </NavLink>
                </li>

                <li className="profile-dropdown__item">
                    <a href="/contacts.html" className="profile-dropdown__link">
                        <span className="profile-dropdown__icon" aria-hidden="true">
                            {profileDropdownIcons.contact}
                        </span>
                        <span>Contact Us</span>
                    </a>
                </li>

                <li className="profile-dropdown__item profile-dropdown__item--logout">
                    <button
                        className="profile-dropdown__button  profile-dropdown__button--logout button"
                        type="button"
                        onClick={handleLogOut}
                    >
                        <span className="profile-dropdown__icon" aria-hidden="true">
                            {profileDropdownIcons.logout}
                        </span>
                        <span>Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default ProfileDropdownMenu;
