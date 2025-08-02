import { ChevronDown } from 'lucide-react';
import React from 'react';

export function CollapsibleButton({
  onToggle,
}: {
  title?: string;
  isOpen: boolean;
  onToggle: () => void;
}) {

  return (
    <button
      type="button"
      className={'collapsible-btn'}
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: 4,
        borderRadius: 4,
        background: '#424254',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <ChevronDown />
    </button>
  );
}
