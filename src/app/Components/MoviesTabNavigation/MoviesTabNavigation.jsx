import React from "react";

const MoviesTabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ["All Releases", "Now Showing", "Re-Release", "Upcoming"];

  return (
    <div className="container movies-tab-navigation">
      <div className="tab-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button  ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoviesTabNavigation;
