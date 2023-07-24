import { Coordinate } from './coordinate';

export const hasSamePosition = (entity1: Coordinate, entity2: Coordinate) =>
  entity1.x === entity2.x && entity1.y === entity2.y;
