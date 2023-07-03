import { Board } from '../Board/Board';
import { BoardSlot } from '../Board/BoardSlot';
import { Coordinate } from '../Board/Coordinate';
import Player from '../Player/Player';

export interface PieceInterface {
  /**
   * Retrieves possible moves.
   *
   * @param board
   */
  getAvailableMoves(board: Board): BoardSlot[];

  /**
   * Actions to take after moving
   */
  postMove(): void;
}

export enum PieceColor {
  BLACK = 'black',
  WHITE = 'white',
}

export class Piece implements PieceInterface {
  position: Coordinate;
  player: Player;

  constructor(player: Player, position: Coordinate) {
    this.player = player;
    this.position = position;
  }

  getAvailableMoves(board: Board): BoardSlot[] {
    throw new Error('Method not implemented.');
  }

  postMove(): void {
    // All good
  }
}
