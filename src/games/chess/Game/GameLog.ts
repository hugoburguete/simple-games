import { Coordinate } from '../Board/Coordinate';
import { Piece } from '../Pieces/Piece';

export type GameLogEntry = {
  from: Coordinate;
  to: Coordinate;
  piece: Piece;
};
