'use client'; // nếu dùng trong client component Next.js

import React from 'react';

interface TagBadgeProps {
  tag: string;
}

const TAG_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  Hard: { bg: '#59343b', color: '#ffbac3', label: 'Khó' },
  Easy: { bg: '#304a1d', color: '#a8e082', label: 'Dễ' },
  Normal: { bg: '#4a340e', color: '#ffd424', label: 'Trung Bình' },
};

const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
  const style = TAG_STYLES[tag];
  if (!style) return null;

  return (
    <span
      className="text-xs rounded px-1 py-0.5 border"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  );
};

export default TagBadge;
