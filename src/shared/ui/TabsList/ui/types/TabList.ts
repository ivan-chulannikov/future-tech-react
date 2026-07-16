export type TabItem = {
    value: string;
    label: string;
};
export type TabListProps = {
    activeTab: string;
    onTabChange: (value: string) => void;
    tabs: readonly TabItem[];
    labelledBy: string;
};
