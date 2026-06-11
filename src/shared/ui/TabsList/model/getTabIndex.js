export const getNextTabIndex =  (currentIndex, tabsLength) => currentIndex === tabsLength - 1 ? 0 : currentIndex + 1;
    

export const getPrevTabIndex = (currentIndex, tabsLength) => currentIndex === 0 ? tabsLength - 1 : currentIndex - 1; 
    

