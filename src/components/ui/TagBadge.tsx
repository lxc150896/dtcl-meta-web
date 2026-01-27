'use client';

import React from 'react';
import { RotateCw } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useTranslation } from '@/i18n';

interface TagBadgeProps {
  tag: string;
}

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  Hard: { bg: '#59343b', color: '#ffbac3' },
  Easy: { bg: '#304a1d', color: '#a8e082' },
  Normal: { bg: '#4a340e', color: '#ffd424' },
};

const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
  const { language } = useData();
  const { t } = useTranslation(language);
  const style = TAG_STYLES[tag];
  
  const getLabel = (tag: string): string => {
    switch (tag) {
      case 'Hard':
        return t.tags.hard;
      case 'Easy':
        return t.tags.easy;
      case 'Normal':
        return t.tags.normal;
      default:
        return tag;
    }
  };

  const isLvTag = /^Lv\s\d+$/.test(tag);

  if (style) {
    return (
      <span
        className="text-xs rounded px-1 py-0.5 border mr-2"
        style={{ backgroundColor: style.bg, color: style.color }}
      >
        {getLabel(tag)}
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
