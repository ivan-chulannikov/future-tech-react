import { useState } from "react";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { TabPanel } from "@/shared/ui/TabPanel";
import { TabsList } from "@/shared/ui/TabsList";
import { PostList, getFilteredPosts } from "@/entities/post";
import { PostSectionProps } from "../types/postSectionProps";


const PostsSection = ({ posts, tabs, sectionHeader}: PostSectionProps) => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPosts = getFilteredPosts(activeTab, posts);

  return (
    <section className="section">
      <SectionHeader {...sectionHeader} />

      <div className="section__body tabs">
        <TabsList
          tabs={tabs}
          activeTab={activeTab}
          onTabChangeHandler={setActiveTab}
        />

        <div className="tabs__body">
          <TabPanel
            isActive={true}
            id={`tabpanel-${activeTab}`}
            labelledBy={`tab-${activeTab}`}
          >
            <PostList posts={filteredPosts}/>
          </TabPanel>
        </div>
      </div>
    </section>
  );
};

export default PostsSection;
