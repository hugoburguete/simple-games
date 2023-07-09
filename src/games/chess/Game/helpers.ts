import { Piece } from '../Pieces/Piece';
import Player from '../Player/Player';

export const isOpponentPiece = (player: Player, piece: Piece) => {
  return player !== piece.player;
};

export const isAllyPiece = (player: Player, piece: Piece) => {
  return !isOpponentPiece(player, piece);
};
