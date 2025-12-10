'use client';

import React from 'react';
import InlineTextWithImages from './InlineTextWithImages';

type LevelItem = {
  level: number;
  detail: string[];
};

type DescType = {
  description: string[];
  levels?: LevelItem[];
};

interface DescRendererProps {
  desc: DescType;
  baseUrl: string;
}

const DescRenderer: React.FC<DescRendererProps> = ({ desc, baseUrl }) => {
  if (!desc) return null;

  // Render inline text + image (dòng có thể xuống)
  const renderInlineParts = (parts: string[]) => (
    <div className="flex flex-wrap items-center">
      {parts.map((item, idx) => {
        const isImage = item.endsWith('.png') || item.endsWith('.jpg');
        return isImage ? (
          <img
            key={idx}
            src={`${baseUrl}damages/${item}`}
            alt=""
            width={20}
            height={20}
            className="mx-1 inline-block"
          />
        ) : (
          <span key={idx} className="text-sm text-gray-300 leading-5">
            {item}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="mt-2">
      {/* Description (inline) */}
      {/* Nếu InlineTextWithImages xử lý mô tả tốt thì giữ nguyên */}
      <InlineTextWithImages desc={desc.description} baseUrl={baseUrl} />

      {/* Levels */}
      {desc.levels && desc.levels.length > 0 && (
        <div className="mt-2 space-y-1">
          {desc.levels.map((levelItem, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <div className="w-[22px] h-[22px] rounded-full border border-gray-400 flex justify-center items-center shrink-0">
                <span className="text-gray-300 text-xs font-bold">
                  {levelItem.level}
                </span>
              </div>
              <div className="flex-1 flex flex-wrap">
                {renderInlineParts(levelItem.detail)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DescRenderer;
