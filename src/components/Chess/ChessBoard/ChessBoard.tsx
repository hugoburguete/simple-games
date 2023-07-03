import React from 'react';
import { BoardInterface } from '../../../games/chess/Board/Board';
import {
  xCoordinates,
  yCoordinates,
} from '../../../games/chess/Board/Coordinate';
import Square from './Square';
import ChessPiece from '../ChessPiece';
import { DroppedEvent } from '../ChessPiece/ChessPiece';

export interface ChessBoardProps {
  board: BoardInterface;
  onPieceDropped: (e: DroppedEvent) => void;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ board, onPieceDropped }) => {
  let i = 0;

  return (
    // Outer ring of the board
    <div className="select-none p-4 pb-11 bg-brown-700 max-w-3xl">
      {/* Horizontal Letters */}
      <div className="h-7 flex justify-between items-center px-7">
        <div className="flex-1 flex">
          {xCoordinates.map((x) => (
            <div
              key={`horizontal-letter-${x}`}
              className="flex-1 flex items-center justify-center"
            >
              {x}
            </div>
          ))}
        </div>
      </div>
      <div className="flex pr-7">
        {/* Vertical numbers */}
        <div className="w-7 flex flex-col">
          {[...yCoordinates].reverse().map((y) => (
            <div
              key={`vertical-number-${y}`}
              className="flex-1 flex justify-center items-center"
            >
              {y}
            </div>
          ))}
        </div>

        {/* Board */}
        <div className="flex-1 flex flex-col">
          {[...yCoordinates].reverse().map((y) => {
            i++;
            return (
              <div className="flex" key={`row-${y}`}>
                {xCoordinates.map((x) => {
                  i++;
                  const boardSlot = board.boardSlots.find(
                    (slot) => slot.coordinate.x === x && slot.coordinate.y === y
                  );

                  return (
                    boardSlot && (
                      <Square
                        slot={boardSlot}
                        colour={i % 2 === 0 ? 'white' : 'black'}
                        key={`row-${x}-${y}`}
                      >
                        {boardSlot?.piece && (
                          <ChessPiece
                            onDropped={onPieceDropped}
                            piece={boardSlot.piece}
                          />
                        )}
                      </Square>
                    )
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
