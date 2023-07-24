import { Board } from '../Board/Board';
import { BoardSlot } from '../Board/BoardSlot';
import {
  XCoordinate,
  YCoordinate,
  xCoordinates,
  yCoordinates,
} from '../utils/coordinate';
import { isAllyPiece } from '../Game/helpers';
import { Piece, PieceInterface } from './Piece';

export default class King extends Piece implements PieceInterface {
  getAvailableMoves(board: Board): BoardSlot[] {
    let availableMoves: BoardSlot[] = [];

    const getXSlots = (y: YCoordinate) => {
      const moves: BoardSlot[] = [];
      const possibleXPositions: XCoordinate[] = [];
      const xValue = xCoordinates.indexOf(this.position.x);

      if (xValue > 0) {
        possibleXPositions.push(xCoordinates[xValue - 1]);
      }

      if (this.position.y !== y) {
        possibleXPositions.push(xCoordinates[xValue]);
      }

      if (xValue < xCoordinates.length) {
        possibleXPositions.push(xCoordinates[xValue + 1]);
      }

      for (let i = 0; i < possibleXPositions.length; i++) {
        const x = possibleXPositions[i];

        const slot = board.boardSlots.find(
          (slot) => slot.coordinate.x === x && slot.coordinate.y === y
        );

        if (slot) {
          if (slot.piece && isAllyPiece(this.player, slot.piece)) {
            continue;
          }

          moves.push(slot);
        }
      }

      return moves;
    };

    // Left row
    const yValue = yCoordinates.indexOf(this.position.y);
    if (yValue > 0) {
      const moves = getXSlots(yCoordinates[yValue - 1]);
      availableMoves = availableMoves.concat(moves);
    }

    // row where the king is
    availableMoves = availableMoves.concat(getXSlots(this.position.y));

    // Right row
    if (yValue < yCoordinates.length) {
      const moves = getXSlots(yCoordinates[yValue + 1]);
      availableMoves = availableMoves.concat(moves);
    }

    return availableMoves;
  }
}
