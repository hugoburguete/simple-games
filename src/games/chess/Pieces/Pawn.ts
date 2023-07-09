import { Board } from '../Board/Board';
import { BoardSlot } from '../Board/BoardSlot';
import { xCoordinates, yCoordinates } from '../Board/Coordinate';
import { isOpponentPiece } from '../Game/helpers';
import { BoardSide } from '../Player/Player';
import { Piece } from './Piece';

export class Pawn extends Piece {
  isFirstMove: boolean = true;

  postMove(): void {
    this.isFirstMove = false;
  }

  getAvailableMoves(board: Board): BoardSlot[] {
    const availableMoves: BoardSlot[] = [];

    // Can we move forward?
    const freeSlotInFront = this.getFreeForwardSlot(board);
    if (freeSlotInFront) {
      availableMoves.push(freeSlotInFront);

      // Can we move 2 slots forward?
      if (this.isFirstMove) {
        const slot = this.get2StepForwardSlot(board);

        if (slot) {
          availableMoves.push(slot);
        }
      }
    }

    // Can we take side pieces?
    (['left', 'right'] as Array<'left' | 'right'>).forEach((side) => {
      const diagonalSlotWithPiece = this.getDiagonalSlotWithOpponentPiece(
        board,
        side
      );
      if (diagonalSlotWithPiece) {
        availableMoves.push(diagonalSlotWithPiece);
      }
    });

    return availableMoves;
  }

  /**
   * Returns the next available forward slot, or null if not available.
   *
   * @param board
   * @returns
   */
  getFreeForwardSlot = (board: Board): BoardSlot | null => {
    const yIncremenet = this.player.sideOfTheBoard === BoardSide.TOP ? -1 : 1;
    const nextYSlotIndex = yCoordinates.indexOf(this.position.y) + yIncremenet;
    const nextYSlot = yCoordinates[nextYSlotIndex];

    const slotInFront = board.boardSlots.find(
      (slot) =>
        slot.coordinate.x === this.position.x && slot.coordinate.y === nextYSlot
    );

    if (slotInFront && !slotInFront.piece) {
      return slotInFront;
    }

    return null;
  };

  /**
   * Returns the next available 2 steps forward slot, or null if not available.
   *
   * @param board
   * @returns
   */
  get2StepForwardSlot = (board: Board): BoardSlot | null => {
    const index =
      this.player.sideOfTheBoard === BoardSide.TOP
        ? yCoordinates.indexOf(this.position.y) - 2
        : yCoordinates.indexOf(this.position.y) + 2;
    const slot = board.boardSlots.find(
      (slot) =>
        slot.coordinate.x === this.position.x &&
        slot.coordinate.y === yCoordinates[index]
    );

    if (slot && !slot.piece) {
      return slot;
    }

    return null;
  };

  /**
   * Returns the next slot left or right slot that has a vulnerable piece, or null if none is available.
   *
   * @param board
   * @returns
   */
  getDiagonalSlotWithOpponentPiece = (
    board: Board,
    leftOrRight: 'left' | 'right'
  ): BoardSlot | null => {
    let diagonalSlot = null;

    const xIncrement = leftOrRight === 'left' ? -1 : 1;
    const yIncrement = this.player.sideOfTheBoard === BoardSide.TOP ? -1 : 1;

    const diagonalX =
      xCoordinates[xCoordinates.indexOf(this.position.x) + xIncrement];
    const diagonalY =
      yCoordinates[yCoordinates.indexOf(this.position.y) + yIncrement];

    if (diagonalX && diagonalY) {
      const boardSlot = board.boardSlots.find(
        (slot) =>
          slot.coordinate.x === diagonalX && slot.coordinate.y === diagonalY
      );

      if (
        boardSlot &&
        boardSlot.piece &&
        isOpponentPiece(this.player, boardSlot.piece)
      ) {
        diagonalSlot = boardSlot;
      }
    }

    return diagonalSlot;
  };

  promote() {
    // TODO: Promote to another piece
  }
}
