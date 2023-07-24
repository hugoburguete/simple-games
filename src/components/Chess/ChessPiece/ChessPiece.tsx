import React, { useEffect, useRef, useState } from 'react';
import { Piece } from '../../../games/chess/Pieces/Piece';
import { GAME_OBJECT_TYPE_SQUARE } from '../ChessBoard/Square/Square';
import {
  Coordinate,
  XCoordinate,
  YCoordinate,
} from '../../../games/chess/utils/coordinate';

export interface DroppedEvent {
  coordinate: Coordinate;
  piece: Piece;
}

export interface ChessPieceProps {
  piece: Piece;
  onDropped: (e: DroppedEvent) => void;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, onDropped }) => {
  const [initialPos, setInitialPos] = useState({
    x: 0,
    y: 0,
  });
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialPos({
      x: ref.current?.offsetLeft ?? 0,
      y: ref.current?.offsetTop ?? 0,
    });
  }, [ref]);

  const onMouseDown = () => {
    setIsDragging(true);
    setInitialPos({
      x: ref.current?.offsetLeft ?? 0,
      y: ref.current?.offsetTop ?? 0,
    });
  };

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) {
      const height = ref.current?.clientHeight ?? 0;
      const width = ref.current?.clientWidth ?? 0;
      setOffset({
        x: e.pageX - initialPos.x - width / 2,
        y: e.pageY - initialPos.y - height / 2,
      });
    }
  };

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) {
      if (ref.current) {
        // Detect drop
        ref.current.hidden = true;

        // Not a very "react-ey" way of doing it but works.
        const elementBelow = document.elementFromPoint(e.pageX, e.pageY);
        ref.current.hidden = false;

        const droppableElementBelow = elementBelow?.closest(
          `[data-game-element-type="${GAME_OBJECT_TYPE_SQUARE}"]`
        );

        if (droppableElementBelow) {
          const coordinate = {
            x: droppableElementBelow.getAttribute('data-x') as XCoordinate,
            y: droppableElementBelow.getAttribute('data-y') as YCoordinate,
          };

          onDropped({ coordinate, piece });
        }
      }

      setOffset({ x: 0, y: 0 });
      setIsDragging(false);
    }
  };

  return (
    <div
      ref={ref}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <p>
        <img
          className="select-none pointer-events-none"
          src="https://placehold.it/50x50"
          alt=""
        />
      </p>
    </div>
  );
};

export default ChessPiece;
