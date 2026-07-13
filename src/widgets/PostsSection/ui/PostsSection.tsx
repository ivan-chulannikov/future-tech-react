import { PostList } from '@/entities/post';

import { Button } from '@/shared/ui/Button';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { StateView } from '@/shared/ui/StateView';
import { TabPanel } from '@/shared/ui/TabPanel';
import { TabsList } from '@/shared/ui/TabsList';

import { postsSectionStateViewContent } from '../model/stateViewPresets';
import type { PostSectionProps } from '../types/postSectionProps';
const PostsSection = ({
    posts,
    tabs,
    sectionHeader,
    activeCategoryId,
    handleCategoryChange,
    isTabsLoading,
    isPostsLoading,
    isPostsError,
    isTabsError,
    onPostsRetry,
    onTabsRetry,
    paginationSlot,
    isPostsFetching,
    renderPostActions,
}: PostSectionProps) => {
    const isInitialLoading = isPostsLoading && posts.length === 0;

    return (
        <section className="section">
            <SectionHeader {...sectionHeader} />
            <div className="section__body tabs">
                {isTabsLoading && <StateView {...postsSectionStateViewContent.tabsLoading} />}
                {!isTabsLoading && isTabsError && (
                    <StateView
                        size="section"
                        {...postsSectionStateViewContent.tabsError}
                        action={
                            <Button type="button" onClick={onTabsRetry}>
                                Try Again
                            </Button>
                        }
                    />
                )}
                {!isTabsLoading && !isTabsError && (
                    <TabsList
                        tabs={tabs}
                        activeTab={activeCategoryId}
                        onTabChangeHandler={handleCategoryChange}
                    />
                )}
                <div className="tabs__body">
                    <TabPanel
                        isActive
                        id={`tabpanel-${activeCategoryId}`}
                        labelledBy={`tab-${activeCategoryId}`}
                    >
                        {isInitialLoading && (
                            <StateView {...postsSectionStateViewContent.postsLoading} />
                        )}
                        {!isPostsLoading && isPostsError && (
                            <StateView
                                {...postsSectionStateViewContent.postsError}
                                action={
                                    <Button type="button" onClick={onPostsRetry}>
                                        Try Again
                                    </Button>
                                }
                            />
                        )}
                        {!isInitialLoading && !isPostsError && posts.length > 0 && (
                            <>
                                <div
                                    className={
                                        isPostsFetching
                                            ? 'posts-section__content is-loading'
                                            : 'posts-section__content'
                                    }
                                >
                                    <PostList posts={posts} renderActions={renderPostActions} />
                                </div>
                                {paginationSlot && (
                                    <div className="posts-section__pagination">
                                        {paginationSlot}
                                    </div>
                                )}
                            </>
                        )}
                    </TabPanel>
                </div>
            </div>
        </section>
    );
};

export default PostsSection;
