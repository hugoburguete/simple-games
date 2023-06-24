import React from 'react';
import { Piece } from '../../../games/chess/Pieces/Piece';

export interface ChessPieceProps {
  piece: Piece;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece }) => {
  return <p>piece goes here</p>;
};

export default ChessPiece;
