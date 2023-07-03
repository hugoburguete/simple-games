import React, { useEffect, useRef, useState } from 'react';
import { Piece } from '../../../games/chess/Pieces/Piece';
import { GAME_OBJECT_TYPE_SQUARE } from '../ChessBoard/Square/Square';
import {
  Coordinate,
  XCoordinate,
  YCoordinate,
} from '../../../games/chess/Board/Coordinate';

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
      // Move in the centre of the piece
      const height = ref.current?.clientHeight ?? 0;
      const width = ref.current?.clientWidth ?? 0;
      setOffset({
        x: e.pageX - initialPos.x - width / 2,
        y: e.pageY - initialPos.y - height / 2,
      });
    }
  };

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isDragging || !ref.current) {
      return;
    }

    // Detect drop
    ref.current.hidden = true;

    // Not a very "react-ey" way of doing it but works.
    const elementBelow = document.elementFromPoint(e.pageX, e.pageY);
    ref.current.hidden = false;

    const droppableElementBelow = elementBelow?.closest(
      `[data-game-element-type="${GAME_OBJECT_TYPE_SQUARE}"]`
    );

    // Reset offset and drag state
    setOffset({ x: 0, y: 0 });
    setIsDragging(false);

    if (!droppableElementBelow) {
      return;
    }

    const coordinate = {
      x: droppableElementBelow.getAttribute('data-x') as XCoordinate,
      y: droppableElementBelow.getAttribute('data-y') as YCoordinate,
    };

    // Has the piece moved squares?
    if (JSON.stringify(coordinate) === JSON.stringify(piece.position)) {
      return;
    }

    onDropped({ coordinate, piece });
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
