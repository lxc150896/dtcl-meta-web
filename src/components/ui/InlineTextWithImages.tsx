'use client';

import React from 'react';
import Image from 'next/image';

interface InlineTextWithImagesProps {
  desc: string[];
  baseUrl: string;
  textStyle?: string; // Tailwind className bổ sung nếu muốn
  scrollable?: boolean; // tuỳ chọn thêm nếu muốn bật scroll
}

const InlineTextWithImages: React.FC<InlineTextWithImagesProps> = ({
  desc,
  baseUrl,
  textStyle = '',
  scrollable = true,
}) => {
  if (!desc || desc.length === 0) return null;
  return (
    <div
      className={`pt-2 text-sm text-gray-300 leading-5 ${
        scrollable ? 'max-h-64 overflow-y-auto pr-2' : ''
      } ${textStyle}`}
    >
      {desc.map((item, idx) => {
        // console.log('Rendering desc item:', item);
        // Nếu là ảnh
        if (item.endsWith('.png') || item.endsWith('.jpg')) {
          return (
            <Image
              key={idx}
              src={`${baseUrl}damages/${item}`}
              alt=""
              width={14}
              height={14}
              className="inline align-middle mx-1"
            />
          );
        }

        // Nếu là xuống dòng
        if (item === '\n') {
          return <br key={idx} />;
        }

        // Nếu là text
        return (
          <span key={idx} className="whitespace-pre-wrap align-middle">
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default InlineTextWithImages;
