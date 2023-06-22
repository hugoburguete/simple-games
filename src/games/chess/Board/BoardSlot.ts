import { Piece } from '../Pieces/Piece';
import { Coordinate } from './Coordinate';

export class BoardSlot {
  coordinate: Coordinate;
  piece?: Piece;

  constructor(coordinate: Coordinate) {
    this.coordinate = coordinate;
  }
}
