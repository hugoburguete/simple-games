import React from 'react';

export interface BadgeProps {
  content: string;
  color: 'primary' | 'secondary';
}

const badgeStyles = {
  primary: 'bg-green-500 text-white',
  secondary: 'bg-blue-500 text-white',
};

export const Badge: React.FC<BadgeProps> = ({ content, color }) => (
  <div
    className={`inline-block rounded-full py-1 px-3 uppercase text-xs font-medium ${badgeStyles[color]}`}
  >
    {content}
  </div>
);

export default Badge;
