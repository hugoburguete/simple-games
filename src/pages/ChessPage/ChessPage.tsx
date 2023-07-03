import React, { useEffect, useState } from 'react';
import { Game } from '../../games/chess/Game/Game';
import ChessBoard from '../../components/Chess/ChessBoard';
import { BoardInterface } from '../../games/chess/Board/Board';

export const ChessPage: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [board, setBoard] = useState<BoardInterface>();

  useEffect(() => {
    const newGame = new Game();
    newGame.startNewGame();
    setGame(newGame);
    setBoard(newGame.board);
  }, []);

  if (!game) {
    return null;
  }

  return (
    <div>
      {board && (
        <ChessBoard
          onPieceDropped={(e) => {
            game.movePiece(e.piece, e.coordinate);

            setBoard({ ...game.board });
          }}
          board={board}
        />
      )}
    </div>
  );
};

export default ChessPage;
