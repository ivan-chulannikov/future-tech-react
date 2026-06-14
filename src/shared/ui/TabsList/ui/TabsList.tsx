

import { TabButton } from "../../TabButton"
import { getNextTabIndex, getPrevTabIndex } from "../model/getTabIndex"
import type {TabListProps} from "./types/TabList"
const TabsList = ({activeTab, onTabChangeHandler, tabs,}: TabListProps) => {
  
    
   
    const onKeyDownHandler = (event: React.KeyboardEvent): void => {
        const currentIndex = tabs.findIndex((tab) =>  tab.id === activeTab);
        if(event.key === 'ArrowRight') {
            event.preventDefault()
            const nextIndex = getNextTabIndex(currentIndex,tabs.length)
            onTabChangeHandler(tabs[nextIndex].id)
        }
         if(event.key === 'ArrowLeft') {
            event.preventDefault()

            const prevIndex = getPrevTabIndex(currentIndex, tabs.length)
            onTabChangeHandler(tabs[prevIndex].id);
        }
        if(event.key === 'End') {
            event.preventDefault()
            const lastIndex = tabs.length-1
            onTabChangeHandler(tabs[lastIndex].id)
        }
        if(event.key === 'Home') {
            event.preventDefault()
            const firstIndex = 0
            onTabChangeHandler(tabs[firstIndex].id)
        }
    }
    return (
        <header className="tabs__header">
            <div
                className="tabs__buttons container"
                role="tablist"
                aria-labelledby="blog-category-title"
               
            >
              {
                tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <TabButton onKeyDown = {onKeyDownHandler}  className = "tabs__button"  key = {tab.id} tabId = {`tab-${tab.id}`} panelId = {`tabpanel-${tab.id}`} isActive = {isActive} onClick = {() => {
                            onTabChangeHandler(tab.id)
                        }}>
                            {tab.label}
                        </TabButton>

                    )
                })
              }
                
            </div>
        </header>
    )
}
export default TabsList
