import React from 'react';
import { Link } from 'react-router-dom';

export interface CardHeaderProps {
  title?: string;
  link?: string;
  subtitle?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  link,
}) => {
  return (
    <div className="mb-3">
      {title && (
        <p data-testid="title" className="text-xl font-medium">
          {link ? (
            <Link to={link} className="hover:underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </p>
      )}
      {subtitle && (
        <p data-testid="subtitle" className="text-sm opacity-50">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default CardHeader;
