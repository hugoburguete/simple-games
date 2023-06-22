import React, { FunctionComponent, ReactNode } from 'react';

export interface BadgeListProps {
  children: ReactNode;
}

export const BadgeList: FunctionComponent<BadgeListProps> = ({ children }) => {
  return <div className="mb-3">{children}</div>;
};
