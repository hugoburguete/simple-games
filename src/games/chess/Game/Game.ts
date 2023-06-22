import { Board } from '../Board/Board';
import {
  Coordinate,
  XCoordinate,
  YCoordinate,
  xCoordinates,
} from '../Board/Coordinate';
import { Bishop } from '../Pieces/Bishop';
import { King } from '../Pieces/King';
import { Pawn } from '../Pieces/Pawn';
import { BoardSide, Piece, PieceColor } from '../Pieces/Piece';
import { Queen } from '../Pieces/Queen';
import { Rook } from '../Pieces/Rook';
import { GameJudge } from './GameJudge';
import { GameLogEntry } from './GameLog';

export class Game {
  board: Board;
  gameJudge: GameJudge = new GameJudge();
  gameLog: GameLogEntry[] = [];

  constructor() {
    this.board = new Board();
  }

  /**
   * Starts a new game.
   */
  startNewGame() {
    // Create pieces
    const pieces: Piece[] = [];

    // Create pawns
    (['2', '7'] as YCoordinate[]).forEach((y) => {
      xCoordinates.forEach((x) => {
        const colour = y === '2' ? PieceColor.WHITE : PieceColor.BLACK;
        const sideOfTheBoard = y === '2' ? BoardSide.TOP : BoardSide.BOTTOM;
        pieces.push(new Pawn(colour, sideOfTheBoard, { x, y }));
      });
    });

    (['1', '8'] as YCoordinate[]).forEach((y) => {
      const colour = y === '1' ? PieceColor.WHITE : PieceColor.BLACK;
      const sideOfTheBoard = y === '1' ? BoardSide.TOP : BoardSide.BOTTOM;

      // Kings
      pieces.push(new King(colour, sideOfTheBoard, { y, x: 'E' }));

      // Queens
      pieces.push(new Queen(colour, sideOfTheBoard, { y, x: 'D' }));

      // Bishops
      (['C', 'F'] as XCoordinate[]).forEach((x) => {
        pieces.push(new Bishop(colour, sideOfTheBoard, { y, x }));
      });

      // Knights
      (['B', 'G'] as XCoordinate[]).forEach((x) => {
        pieces.push(new Bishop(colour, sideOfTheBoard, { y, x }));
      });

      // Rooks
      (['A', 'H'] as XCoordinate[]).forEach((x) => {
        pieces.push(new Rook(colour, sideOfTheBoard, { y, x }));
      });
    });

    this.board.loadPieces(pieces);
  }

  /**
   * Loads an existing game.
   */
  loadGame() {}

  /**
   * Moves a piece
   *
   * @param piece
   * @param newPosition
   * @returns
   */
  movePiece(piece: Piece, newPosition: Coordinate) {
    // Validate if the piece can move there
    if (!this.gameJudge.validateMove(this.board, piece, newPosition)) {
      return;
    }

    // Move the piece
    piece.position = newPosition;
    const oldBoardSlot = this.board.boardSlots.find(
      (slot) =>
        slot.coordinate.x === piece.position.x &&
        slot.coordinate.y === piece.position.y
    );
    if (oldBoardSlot) {
      oldBoardSlot.piece = undefined;
    }
    const newBoardSlot = this.board.boardSlots.find(
      (slot) =>
        slot.coordinate.x === newPosition.x &&
        slot.coordinate.y === newPosition.y
    );
    if (newBoardSlot) {
      // Take opponent piece.
      if (newBoardSlot.piece) {
        this.board.piecesTaken.push(newBoardSlot.piece);
      }

      // Land the piece
      newBoardSlot.piece = piece;
    }

    // Log the move
    if (oldBoardSlot && newBoardSlot) {
      this.gameLog.push({
        from: oldBoardSlot.coordinate,
        to: newBoardSlot.coordinate,
        piece,
      });
    }
  }
}
