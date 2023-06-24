import { Piece, PieceColor } from '../Pieces/Piece';

export enum BoardSide {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export default class Player {
  piecesColour: PieceColor;
  pieces: Piece[] = [];
  piecesTaken: Piece[] = [];
  sideOfTheBoard: BoardSide;

  constructor(piecesColour: PieceColor, sideOfTheBoard: BoardSide) {
    this.piecesColour = piecesColour;
    this.sideOfTheBoard = sideOfTheBoard;
  }

  isCheck() {}

  isCheckMate() {}
}
