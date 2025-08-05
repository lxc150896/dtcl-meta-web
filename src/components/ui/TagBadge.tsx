'use client';

import React from 'react';
import { RotateCw } from 'lucide-react';

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

  const isLvTag = /^Lv\s\d+$/.test(tag);

  if (style) {
    return (
      <span
        className="text-xs rounded px-1 py-0.5 border mr-2"
        style={{ backgroundColor: style.bg, color: style.color }}
      >
        {style.label}
      </span>
    );
  }

  if (isLvTag) {
    return (
      <span
        className="text-xs rounded px-1 py-0.5 border flex items-center gap-1 mr-2"
        style={{ backgroundColor: '#2f2f2f', color: '#fff' }}
      >
        <RotateCw className="w-3 h-3" />
        {tag}
      </span>
    );
  }

  return null;
};

export default TagBadge;
