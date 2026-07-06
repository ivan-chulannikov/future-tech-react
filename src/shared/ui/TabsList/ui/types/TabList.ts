import type { Category } from '@/entities/category';

export type TabListProps = {
    activeTab: string;
    onTabChangeHandler: (activeTabId: string) => void;
    tabs: Category[];
};
