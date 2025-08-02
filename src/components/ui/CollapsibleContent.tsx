'use client';

import React from 'react';

interface CollapsibleContentProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="mt-1 bg-zinc-700">
      {children}
    </div>
  );
};

export default CollapsibleContent;
