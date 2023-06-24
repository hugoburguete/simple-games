import React from 'react';
import { Board } from '../../../games/chess/Board/Board';
import {
  xCoordinates,
  yCoordinates,
} from '../../../games/chess/Board/Coordinate';

export interface ChessBoardProps {
  board: Board;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ board }) => {
  let i = 0;

  return (
    // Outer ring of the board
    <div className="p-4 bg-brown-700">
      {/* Horizontal Letters */}
      <div className="h-7 flex justify-between items-center px-7">
        <div className="flex-1 flex">
          {xCoordinates.map((x) => (
            <div className="flex-1 flex items-center justify-center">{x}</div>
          ))}
        </div>
      </div>
      <div className="flex pr-7">
        {/* Vertical numbers */}
        <div className="w-7 flex flex-col">
          {[...yCoordinates].reverse().map((y) => (
            <div className="flex-1 flex justify-center items-center">{y}</div>
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
                    <div
                      className={`flex-1 aspect-square ${
                        i % 2 === 0 ? 'bg-slate-50' : 'bg-black'
                      }`}
                      key={`row-${x}-${y}`}
                    >
                      {x}, {y}
                      {boardSlot?.piece && (
                        <p>{boardSlot.piece.constructor.name}</p>
                      )}
                    </div>
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
