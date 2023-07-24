export const yCoordinates: YCoordinate[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
];
export const xCoordinates: XCoordinate[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
];

export type YCoordinate = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type XCoordinate = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export type Coordinate = {
  x: XCoordinate;
  y: YCoordinate;
};
