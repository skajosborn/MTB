import React from 'react';

type Tab = {
  label: string;
  value: string;
};

type NavigationTabsProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function NavigationTabs({ tabs, activeTab, setActiveTab }: NavigationTabsProps) {
  return (
    <div className="bg-gray-900 sticky top-20 z-30 w-full border-b border-gray-700" style={{ overflow: 'visible' }}>
      <div className="max-w-[90%] mx-auto px-4 md:px-8">
        <div className="flex items-center py-4">
          <div className="flex flex-grow space-x-8 text-gray-300 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`whitespace-nowrap px-6 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.value
                    ? 'bg-gray-800 text-white border-b-2 border-green-500 shadow-lg'
                    : 'hover:bg-gray-800/50 hover:text-white'
                } cursor-pointer`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 