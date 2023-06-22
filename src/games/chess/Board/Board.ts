import { Piece } from '../Pieces/Piece';
import { BoardSlot } from './BoardSlot';
import { xCoordinates, yCoordinates } from './Coordinate';

export class Board {
  boardSlots: BoardSlot[] = [];
  pieces: Piece[] = [];
  piecesTaken: Piece[] = [];

  constructor() {
    xCoordinates.forEach((x) => {
      yCoordinates.forEach((y) => {
        this.boardSlots.push(new BoardSlot({ x, y }));
      });
    });
  }

  loadPieces(pieces: Piece[]) {
    this.pieces = pieces;
    pieces.forEach((piece) => {
      const slot = this.boardSlots.find(
        (slot) =>
          slot.coordinate.x === piece.position.x &&
          slot.coordinate.y === piece.position.y
      );
      if (slot) {
        slot.piece = piece;
      }
    });
  }
}
