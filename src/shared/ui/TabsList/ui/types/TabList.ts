import { Category } from "@/entities/categories";

export type TabListProps = {
    activeTab: string;
    onTabChangeHandler: (activeTabId: string) => void; 
    tabs: Category[]
}