export const getNextTabIndex = (currentIndex: number, tabsLength: number) =>
    currentIndex === tabsLength - 1 ? 0 : currentIndex + 1;

export const getPrevTabIndex = (currentIndex: number, tabsLength: number) =>
    currentIndex === 0 ? tabsLength - 1 : currentIndex - 1;
