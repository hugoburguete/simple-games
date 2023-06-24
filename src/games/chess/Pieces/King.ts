import { Board } from '../Board/Board';
import { BoardSlot } from '../Board/BoardSlot';
import { xCoordinates } from '../Board/Coordinate';
import { Piece, PieceInterface } from './Piece';

export default class King extends Piece implements PieceInterface {
  getAvailableMoves(board: Board): BoardSlot[] {
    const availableMoves: BoardSlot[] = [];

    // let allXCoords = [];
    if (xCoordinates.findIndex((coord) => coord === this.position.x) >= 0) {
    }

    return availableMoves;
  }
}
