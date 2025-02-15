'use client';

import React from 'react';

export type TabType = 'ongoing' | 'scheduled' | 'completed';

interface TabProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabProps) {
  const tabDisplay: Record<TabType, string> = {
    ongoing: '진행중',
    scheduled: '진행예정',
    completed: '완료',
  };

  const handleTabClick = (tab: TabType) => {
    onTabChange(tab);
  };

  return (
    <div className="">
      <div className="tabs flex space-x-4 border-b">
        {(['ongoing', 'scheduled', 'completed'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 focus:outline-none ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            {tabDisplay[tab]}
          </button>
        ))}
      </div>

      <div className="tab-content p-4">
        {activeTab === 'ongoing' && <div>진행중 콘텐츠</div>}
        {activeTab === 'scheduled' && <div>진행예정 콘텐츠</div>}
        {activeTab === 'completed' && <div>완료 콘텐츠</div>}
      </div>
    </div>
  );
}
