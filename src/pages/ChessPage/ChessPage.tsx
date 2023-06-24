import React, { useEffect, useState } from 'react';
import { Game } from '../../games/chess/Game/Game';
import ChessBoard from '../../components/Chess/ChessBoard';

export const ChessPage: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const newGame = new Game();
    newGame.startNewGame();
    setGame(newGame);
  }, []);

  if (!game) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => {
          game.movePiece(game.board.pieces[0], {
            x: 'A',
            y: '3',
          });
          console.log(game.board);
        }}
      >
        Move piece
      </button>
      <ChessBoard board={game.board} />
    </div>
  );
};

export default ChessPage;
