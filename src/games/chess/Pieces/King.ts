import { Board } from '../Board/Board';
import { BoardSlot } from '../Board/BoardSlot';
import {
  XCoordinate,
  YCoordinate,
  xCoordinates,
  yCoordinates,
} from '../Board/Coordinate';
import { isAllyPiece } from '../Game/helpers';
import { Piece, PieceInterface } from './Piece';

export default class King extends Piece implements PieceInterface {
  getAvailableMoves(board: Board): BoardSlot[] {
    let availableMoves: BoardSlot[] = [];

    const getXSlots = (y: YCoordinate) => {
      const moves: BoardSlot[] = [];
      const possibleXPositions: XCoordinate[] = [];
      if (xCoordinates.indexOf(this.position.x) > 0) {
        possibleXPositions.push(
          xCoordinates[xCoordinates.indexOf(this.position.x) - 1]
        );
      }

      if (this.position.y !== y) {
        possibleXPositions.push(
          xCoordinates[xCoordinates.indexOf(this.position.x)]
        );
      }

      if (xCoordinates.indexOf(this.position.x) < xCoordinates.length) {
        possibleXPositions.push(
          xCoordinates[xCoordinates.indexOf(this.position.x) + 1]
        );
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
    if (yCoordinates.indexOf(this.position.y) > 0) {
      const moves = getXSlots(
        yCoordinates[yCoordinates.indexOf(this.position.y) - 1]
      );
      availableMoves = availableMoves.concat(moves);
    }

    // row where the king is
    availableMoves = availableMoves.concat(getXSlots(this.position.y));

    // Right row
    if (yCoordinates.indexOf(this.position.y) < yCoordinates.length) {
      const moves = getXSlots(
        yCoordinates[yCoordinates.indexOf(this.position.y) + 1]
      );
      availableMoves = availableMoves.concat(moves);
    }

    return availableMoves;
  }
}
