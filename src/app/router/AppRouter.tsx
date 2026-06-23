import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import BlogDetails from '@/pages/BlogDetails';
import ScrollToTop from './ScrollToTop/ScrollToTop';
import RootLayout from '../layouts/RootLayout';
import { NotFound } from '@/pages/NotFound';
import { AppRoutes } from '@/shared/config/routes';
import { SavedPosts } from '@/pages/SavedPosts';
import { Login } from '@/pages/Login';
import RegisterForm from '@/features/auth/ui/RegisterForm/RegisterForm';
export const AppRouter = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path={AppRoutes.home} element={<Home />} />
                    <Route path={AppRoutes.blogDetails} element={<BlogDetails />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path={AppRoutes.savedPosts} element={<SavedPosts />} />
                    <Route path={AppRoutes.login} element={<Login />} />
                    <Route path={AppRoutes.register} element={<RegisterForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
