import { Board } from '../Board/Board';
import { BoardSlot } from '../Board/BoardSlot';
import { YCoordinate, xCoordinates, yCoordinates } from '../Board/Coordinate';
import { BoardSide, Piece, PieceInterface } from './Piece';

export class Pawn extends Piece implements PieceInterface {
  isFirstMove: boolean = true;

  setIsFirstMove(isFirstMove: boolean): void {
    this.isFirstMove = isFirstMove;
  }

  getAvailableMoves(board: Board): BoardSlot[] {
    const availableMoves: BoardSlot[] = [];

    // Can we move 2 slots forward?
    if (this.isFirstMove) {
      const index =
        this.sideOfTheBoard === BoardSide.TOP
          ? yCoordinates.indexOf(this.position.y) - 2
          : yCoordinates.indexOf(this.position.y) + 2;
      const slot = board.boardSlots.find(
        (slot) =>
          slot.coordinate.x === this.position.x &&
          slot.coordinate.y === yCoordinates[index]
      );

      if (slot && !slot.piece) {
        availableMoves.push(slot);
      }
    }

    let nextYSlot: YCoordinate | undefined;

    if (this.sideOfTheBoard === BoardSide.TOP) {
      const nextYSlotIndex = yCoordinates.indexOf(this.position.y) - 1;
      if (nextYSlotIndex >= 0) {
        nextYSlot = yCoordinates[nextYSlotIndex];
      }
    } else {
      const nextYSlotIndex = yCoordinates.indexOf(this.position.y) + 1;
      if (nextYSlotIndex <= yCoordinates.length - 1) {
        nextYSlot = yCoordinates[nextYSlotIndex];
      }
    }

    if (nextYSlot) {
      // can move forward?
      const slotInFront = board.boardSlots.find(
        (slot) =>
          slot.coordinate.x === this.position.x &&
          slot.coordinate.y === nextYSlot
      );

      if (slotInFront && !slotInFront.piece) {
        availableMoves.push(slotInFront);
      }

      // can take diagonal pieces
      if (xCoordinates.indexOf(this.position.x) - 1 >= 0) {
        const leftDiagonalX =
          xCoordinates[xCoordinates.indexOf(this.position.x) - 1];
        const boardSlot = board.boardSlots.find(
          (slot) =>
            slot.coordinate.x === leftDiagonalX &&
            slot.coordinate.y === this.position.y
        );

        if (boardSlot) {
          availableMoves.push(boardSlot);
        }
      }

      if (
        xCoordinates.indexOf(this.position.x) + 1 <=
        xCoordinates.length - 1
      ) {
        const rightDiagonalX =
          xCoordinates[xCoordinates.indexOf(this.position.x) + 1];
        const boardSlot = board.boardSlots.find(
          (slot) =>
            slot.coordinate.x === rightDiagonalX &&
            slot.coordinate.y === this.position.y
        );

        if (boardSlot) {
          availableMoves.push(boardSlot);
        }
      }
    }

    return availableMoves;
  }

  promote() {
    // TODO: Promote to another piece
  }
}
