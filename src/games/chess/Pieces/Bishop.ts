import { Board } from '../Board/Board';
import { BoardSlot } from '../Board/BoardSlot';
import { Piece, PieceInterface } from './Piece';

export class Bishop extends Piece implements PieceInterface {
  getAvailableMoves(board: Board): BoardSlot[] {
    throw new Error('Method not implemented.');
  }
}
