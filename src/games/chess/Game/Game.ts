import { Board } from '../Board/Board';
import {
  Coordinate,
  XCoordinate,
  YCoordinate,
  xCoordinates,
} from '../utils/coordinate';
import { Bishop } from '../Pieces/Bishop';
import King from '../Pieces/King';
import { Pawn } from '../Pieces/Pawn';
import { Piece, PieceColor } from '../Pieces/Piece';
import { Queen } from '../Pieces/Queen';
import { Rook } from '../Pieces/Rook';
import Player, { BoardSide } from '../Player/Player';
import { hasSamePosition } from '../utils/utils';
import { GameJudge } from './GameJudge';
import { GameLogEntry } from './GameLog';

export class Game {
  board: Board;
  players: Player[] = [];
  turn: Player;
  gameJudge: GameJudge = new GameJudge();
  gameLog: GameLogEntry[] = [];

  constructor() {
    this.board = new Board();
    const player1 = new Player(PieceColor.BLACK, BoardSide.TOP);
    const player2 = new Player(PieceColor.WHITE, BoardSide.BOTTOM);
    this.players = [player1, player2];
    this.turn = player1;
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
        const player = y === '2' ? this.players[1] : this.players[0];
        pieces.push(new Pawn(player, { x, y }));
      });
    });

    (['1', '8'] as YCoordinate[]).forEach((y) => {
      const player = y === '1' ? this.players[1] : this.players[0];

      // Kings
      pieces.push(new King(player, { y, x: 'E' }));

      // Queens
      pieces.push(new Queen(player, { y, x: 'D' }));

      // Bishops
      (['C', 'F'] as XCoordinate[]).forEach((x) => {
        pieces.push(new Bishop(player, { y, x }));
      });

      // Knights
      (['B', 'G'] as XCoordinate[]).forEach((x) => {
        pieces.push(new Bishop(player, { y, x }));
      });

      // Rooks
      (['A', 'H'] as XCoordinate[]).forEach((x) => {
        pieces.push(new Rook(player, { y, x }));
      });
    });

    // Set player pieces
    this.players[0].pieces = pieces.filter(
      (piece) => piece.player === this.players[0]
    );
    this.players[1].pieces = pieces.filter(
      (piece) => piece.player === this.players[1]
    );

    // Load board
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
    const boardSlots = this.board.boardSlots;
    const oldBoardSlot = boardSlots.find((slot) =>
      hasSamePosition(slot.coordinate, piece.position)
    );
    if (oldBoardSlot) {
      boardSlots[boardSlots.indexOf(oldBoardSlot)].piece = undefined;
    }
    piece.position = newPosition;
    const newBoardSlot = boardSlots.find((slot) =>
      hasSamePosition(slot.coordinate, newPosition)
    );

    if (newBoardSlot) {
      // Take opponent piece.
      if (newBoardSlot.piece) {
        this.board.piecesTaken.push(newBoardSlot.piece);
      }

      // Land the piece
      newBoardSlot.piece = piece;
    }

    piece.postMove();

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
