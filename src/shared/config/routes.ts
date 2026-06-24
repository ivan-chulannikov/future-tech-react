export const AppRoutes = {
    home: '/',
    blogDetails: '/blog/:id',
    savedPosts: '/saved',
    login: '/login',
    register: '/register',
    profile: '/profile'
} as const;

export const getBlogDetailsRoute = (postId: string) => {
    return `/blog/${postId}`;
};
export const getSavedPostsRoute = () => '/saved';
