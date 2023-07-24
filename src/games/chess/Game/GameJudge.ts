import { Board } from '../Board/Board';
import { Coordinate } from '../utils/coordinate';
import { Piece } from '../Pieces/Piece';

/**
 *
 */
export class GameJudge {
  /**
   * Validates a move.
   *
   * @param piece The piece moving
   * @param newPosition The position the piece will land on
   * @returns true if the move is valid, false otherwise
   */
  validateMove(board: Board, piece: Piece, newPosition: Coordinate): boolean {
    const availableSlots = piece.getAvailableMoves(board);
    return !!availableSlots.find(
      (slot) =>
        slot.coordinate.x === newPosition.x &&
        slot.coordinate.y === newPosition.y
    );
  }
}
