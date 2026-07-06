import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectIsAuthenticated } from '@/features/auth/model/selectors';
import { useLogoutRequestMutation } from '@/features/auth/api/authApi';
import { AppRoutes } from '@/shared/config/routes';
import Button from '@/shared/ui/Button';

import { logout } from '@/features/auth/model/authSlice';
import type { ProfileDropdownProps } from '../ProfileDropdown/types/types';
import ProfileDropdownMenu from '../ProfileDropdownMenu/ProfileDropdownMenu';
export const ProfileDropdown = ({ className }: ProfileDropdownProps) => {
    const [logoutRequest] = useLogoutRequestMutation()
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!dropdownRef.current) return;

            const isClickInside = dropdownRef.current.contains(event.target as Node);

            if (!isClickInside) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!isAuthenticated) {
        return (
            <NavLink
                to={AppRoutes.login}
                className={({ isActive }) =>
                    isActive
                        ? `${className} is-active profile-auth-button`
                        : `${className} profile-auth-button`
                }
            >
                <span className="profile-auth-button__icon" aria-hidden="true"/>
                <span className="profile-auth-button__label">Sign in</span>
            </NavLink>
        );
    }
    const handleClose = (key: string) => {
        if (key === 'Escape') {
            setIsOpen(false);
        }
    };

   const handleLogOut = async () => {
    try {
        await logoutRequest().unwrap();
    } catch {
        console.error('Failed to logout on server');
    } finally {
        dispatch(logout());
        void navigate(AppRoutes.home);
    }
};
    return (
        <div className="profile-dropdown" ref={dropdownRef}>
            <Button
                className="profile-menu-button"
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                onKeyDown={(event) => {
                    handleClose(event.key);
                }}
            >
                <span className="profile-menu-button__icon" aria-hidden="true"/>
                <span className="profile-menu-button__initials">IP</span>
                <span className="profile-menu-button__arrow" aria-hidden="true"/>
            </Button>

            {isOpen && (
                <ProfileDropdownMenu
                    className="profile-dropdown__menu--desktop"
                    handleLogOut={() => void handleLogOut()}
                />
            )}
            <ProfileDropdownMenu
                className="profile-dropdown__menu--mobile"
                handleLogOut={() => void handleLogOut()}
            />
        </div>
    );
};
