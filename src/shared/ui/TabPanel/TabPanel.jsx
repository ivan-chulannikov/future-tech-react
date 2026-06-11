const TabPanel = ({ children, isActive, id, labelledBy }) => {
  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      id={id}
      aria-labelledby={labelledBy}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default TabPanel;