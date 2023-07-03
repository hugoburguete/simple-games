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
  /**
   * The piece to render
   */
  piece: Piece;

  /**
   * Event triggered when a piece drops in a square.
   *
   * @param e
   */
  onDropped: (e: DroppedEvent) => void;
}

/**
 * Chess piece Component
 */
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

  /**
   * On mouse down event handler
   */
  const onMouseDown = () => {
    setIsDragging(true);
    setInitialPos({
      x: ref.current?.offsetLeft ?? 0,
      y: ref.current?.offsetTop ?? 0,
    });
  };

  /**
   * On mouse move event handler
   */
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

  /**
   * On mouse up/leave event handler
   */
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
      <img
        className="select-none pointer-events-none"
        src="https://placehold.it/50x50"
        alt=""
      />
    </div>
  );
};

export default ChessPiece;
