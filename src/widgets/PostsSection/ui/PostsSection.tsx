
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { TabPanel } from "@/shared/ui/TabPanel";
import { TabsList } from "@/shared/ui/TabsList";
import { PostList} from "@/entities/post";
import { PostSectionProps } from "../types/postSectionProps";


const PostsSection = ({ posts, tabs, sectionHeader, activeCategoryId, onCategoryChange}: PostSectionProps) => {
 

  
  return (
    <section className="section">
      <SectionHeader {...sectionHeader} />

      <div className="section__body tabs">
        <TabsList
          tabs={tabs}
          activeTab={activeCategoryId}
          onTabChangeHandler={onCategoryChange}
        />

        <div className="tabs__body">
          <TabPanel
            isActive={true}
            id={`tabpanel-${activeCategoryId}`}
            labelledBy={`tab-${activeCategoryId}`}
          >
            <PostList posts={posts}/>
          </TabPanel>
        </div>
      </div>
    </section>
  );
};

export default PostsSection;
