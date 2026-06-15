export const AppRoutes = {
  home: '/',
  blogDetails: '/blog/:id',
} as const;

export const getBlogDetailsRoute = (postId: string) => {
  return `/blog/${postId}`;
};