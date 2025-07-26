import React from 'react';

interface IconProps {
  className?: string;
}

export const Cube3dIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 3L3 8.5v7L12 21l9-5.5v-7L12 3z"/>
    <path d="M3 8.5l9 5.5 9-5.5"/>
    <path d="M12 14v7"/>
  </svg>
);
