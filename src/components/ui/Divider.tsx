import React from 'react';

const Divider: React.FC<{ color?: string }> = ({ color }) => (
  <hr style={{
    border: 'none',
    borderTop: `1px solid ${color || '#ccc'}`,
    margin: '10px 0'
  }} />
);

export default Divider;
