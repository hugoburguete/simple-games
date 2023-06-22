import React, { useEffect } from 'react';
import { Game } from '../../games/chess/Game/Game';

export const ChessPage: React.FC = () => {
  useEffect(() => {
    const game = new Game();
    game.startNewGame();
    game.movePiece(game.board.pieces[0], {
      x: 'A',
      y: '3',
    });
    console.log(game.board);
  }, []);
  return <p>TODO: Chess page</p>;
};

export default ChessPage;
