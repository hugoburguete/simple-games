import { Piece } from '../Pieces/Piece';
import { Coordinate } from '../utils/coordinate';

export class BoardSlot {
  coordinate: Coordinate;
  piece?: Piece;

  constructor(coordinate: Coordinate) {
    this.coordinate = coordinate;
  }
}
