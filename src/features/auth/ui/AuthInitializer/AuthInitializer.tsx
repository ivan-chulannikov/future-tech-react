import { useEffect, useState, type PropsWithChildren } from 'react';

import { useAppDispatch } from '@/app/store/hooks';
import { useRefreshMutation } from '../../api/authApi';
import { logout, setCredentials } from '../../model/authSlice';

export const AuthInitializer = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();
    const [refresh] = useRefreshMutation();

    const [isAuthInitialized, setIsAuthInitialized] = useState(false);

     useEffect(() => {
        let isMounted = true;

        const initAuth = async () => {
            try {
                const response = await refresh().unwrap();

                if (isMounted) {
                    dispatch(setCredentials(response));
                }
            } catch {
                if (isMounted) {
                    dispatch(logout());
                }
            } finally {
                if (isMounted) {
                    setIsAuthInitialized(true);
                }
            }
        };

        void initAuth();

        return () => {
            isMounted = false;
        };
    }, [dispatch, refresh]);

    if (!isAuthInitialized) {
        return null;
    }

    return children;
};