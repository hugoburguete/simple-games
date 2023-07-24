import { Coordinate } from '../utils/coordinate';
import { Piece } from '../Pieces/Piece';

export type GameLogEntry = {
  from: Coordinate;
  to: Coordinate;
  piece: Piece;
};
