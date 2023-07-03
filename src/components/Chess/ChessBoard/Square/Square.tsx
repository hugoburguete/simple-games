import React from 'react';
import { BoardSlot } from '../../../../games/chess/Board/BoardSlot';

export type SquareColour = 'black' | 'white';

export interface SquareProps {
  colour: SquareColour;
  slot: BoardSlot;
  children: React.ReactNode;
}

export const GAME_OBJECT_TYPE_SQUARE = 'square';

const Square: React.FC<SquareProps> = ({ colour, children, slot }) => {
  return (
    <div
      data-game-element-type={GAME_OBJECT_TYPE_SQUARE}
      data-x={slot.coordinate.x}
      data-y={slot.coordinate.y}
      className={`flex-1 aspect-square flex justify-center items-center ${
        colour === 'black' ? 'bg-slate-50 text-black' : 'bg-black text-slate-50'
      }`}
    >
      {children}
    </div>
  );
};

export default Square;
