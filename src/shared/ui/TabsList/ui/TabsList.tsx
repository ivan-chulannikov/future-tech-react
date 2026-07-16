import { TabButton } from '../../TabButton';
import { getNextTabIndex, getPrevTabIndex } from '../model/getTabIndex';
import type { TabListProps } from './types/TabList';
const TabsList = ({ activeTab, onTabChange, tabs, labelledBy }: TabListProps) => {
    const onKeyDownHandler = (event: React.KeyboardEvent): void => {
        if (tabs.length === 0) {
            return;
        }
        const currentIndex = tabs.findIndex((tab) => tab.value === activeTab);
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            const nextIndex = getNextTabIndex(currentIndex, tabs.length);
            onTabChange(tabs[nextIndex].value);
        }
        if (event.key === 'ArrowLeft') {
            event.preventDefault();

            const prevIndex = getPrevTabIndex(currentIndex, tabs.length);
            onTabChange(tabs[prevIndex].value);
        }
        if (event.key === 'End') {
            event.preventDefault();
            const lastIndex = tabs.length - 1;
            onTabChange(tabs[lastIndex].value);
        }
        if (event.key === 'Home') {
            event.preventDefault();
            const firstIndex = 0;
            onTabChange(tabs[firstIndex].value);
        }
    };
    return (
        <header className="tabs__header">
            <div className="tabs__buttons container" role="tablist" aria-labelledby={labelledBy}>
                {tabs.map((tab) => {
                    return (
                        <TabButton
                            onKeyDown={onKeyDownHandler}
                            className="tabs__button"
                            key={tab.value}
                            tabId={`tab-${tab.value}`}
                            panelId={`tabpanel-${tab.value}`}
                            isActive={activeTab === tab.value}
                            onClick={() => onTabChange(tab.value)}
                        >
                            {tab.label}
                        </TabButton>
                    );
                })}
            </div>
        </header>
    );
};
export default TabsList;
