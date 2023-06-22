import { Board } from '../Board/Board';
import { BoardSlot } from '../Board/BoardSlot';
import { Coordinate } from '../Board/Coordinate';

export interface PieceInterface {
  getAvailableMoves(board: Board): BoardSlot[];
}

export enum PieceColor {
  BLACK = 'black',
  WHITE = 'white',
}

export enum BoardSide {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export class Piece implements PieceInterface {
  sideOfTheBoard: BoardSide;
  color: PieceColor;
  position: Coordinate;

  constructor(
    colour: PieceColor,
    sideOfTheBoard: BoardSide,
    position: Coordinate
  ) {
    this.color = colour;
    this.position = position;
    this.sideOfTheBoard = sideOfTheBoard;
  }

  getAvailableMoves(board: Board): BoardSlot[] {
    throw new Error('Method not implemented.');
  }
}
