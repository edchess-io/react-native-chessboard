import type { Square } from 'chess.js';
import { useCallback, useMemo } from 'react';
import { useChessboardProps } from './context/props-context/hooks';

import type { Vector } from './types';

const useReversePiecePosition = () => {
  const { pieceSize, playersColor } = useChessboardProps();

  const isBlackPiecePosition = useMemo(
    () => playersColor === 'b',
    [playersColor]
  );

  const toTranslation = useCallback(
    (to: Square) => {
      'worklet';
      const tokens = to.split('');
      const col = tokens[0];
      const row = tokens[1];
      if (!col || !row) {
        throw new Error('Invalid notation: ' + to);
      }
      const indexes = {
        x: col.charCodeAt(0) - 'a'.charCodeAt(0),
        y: parseInt(row, 10) - 1,
      };
      return {
        x: indexes.x * pieceSize,
        y: 7 * pieceSize - indexes.y * pieceSize,
      };
    },
    [pieceSize]
  );

  const toPosition = useCallback(
    ({ x, y }: Vector) => {
      'worklet';
      const col = String.fromCharCode(97 + Math.round(x / pieceSize));
      const row = `${8 - Math.round(y / pieceSize)}`;
      return `${col}${row}` as Square;
    },
    [pieceSize]
  );

  return {
    toPosition,
    toTranslation,
    isBlackPiecePosition,
  };
};

export { useReversePiecePosition };
