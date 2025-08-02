// components/StatBox.tsx
import React from 'react';

interface StatBoxProps {
  title: string;
  value: string | number;
  subText?: string;
  barColor?: string;
  percent?: number;
  style?: string;
  className?: string;
}

const StatBox = ({ title, value, subText, percent = 0, barColor = '#000', style = '', className = '' }: StatBoxProps) => {
  return (
    <div className={`flex flex-col ${style} ${className}`}>
      <div className="flex justify-between">
        <span className="text-xs text-gray-400">{title}</span>
        <span className="text-xs text-white">{value}</span>
      </div>
      <div className="h-1 bg-gray-300 rounded mt-1 mb-1">
        <div
          className="h-1 rounded"
          style={{
            width: `${percent * 100}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
      {subText && <span className="text-[11px] text-gray-400">{subText}</span>}
    </div>
  );
};

export default StatBox;
