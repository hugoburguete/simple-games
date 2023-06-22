import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => (
  <div className="rounded-sm shadow-md p-4">{children}</div>
);
