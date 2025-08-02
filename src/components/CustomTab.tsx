'use client';
import React from 'react';

interface CustomTabProps {
  tabs: string[];
  activeTab: number;
  onChange: (index: number) => void;
}

const CustomTab: React.FC<CustomTabProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="bg-gray-900 overflow-x-auto">
      <div className="flex w-max">
        {tabs.map((tab, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => onChange(index)}
              className="flex flex-col items-center md:px-4 md:py-3 px-3 py-2 cursor-pointer"
            >
              <span
                className={`text-base ${
                  activeTab === index ? 'text-[#ffb900]' : 'text-[#bbb]'
                }`}
              >
                {tab}
              </span>
              {activeTab === index && (
                <div className="mt-1 h-[3px] w-full bg-[#ffb900] rounded-sm" />
              )}
            </button>
            {index < tabs.length - 1 && (
              <div className="w-[1px] h-[60%] bg-white/20 self-center" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTab;
