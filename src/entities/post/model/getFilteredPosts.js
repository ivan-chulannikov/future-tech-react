export const getFilteredPosts = (activeTab, posts = []) => {
  if (activeTab === "all") {
    return posts;
  }

  return posts.filter((post) => post.category?.value === activeTab);
};