import React from 'react';
import { Card } from '../../components/Card/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import Badge from '../../components/Badge/Badge';
import { BadgeList } from '../../components/Badge/BadgeList/BadgeList';

export const Homepage: React.FC = () => {
  return (
    <div className="flex m-10">
      <div className="w1/4">
        <Card>
          <BadgeList>
            <Badge content="Complete" color="primary" />
          </BadgeList>
          <CardHeader
            link="/chess"
            title="Chess"
            subtitle="Added Jun 22, 2023"
          />
          <p>A classic chess game</p>
        </Card>
      </div>
    </div>
  );
};
