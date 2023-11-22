import React, { useImperativeHandle, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Background from './components/chessboard-background';
import { HighlightedSquares } from './components/highlighted-squares';
import { Pieces } from './components/pieces';
import { SuggestedDots } from './components/suggested-dots';
import { ChessboardContextProvider } from './context/board-context-provider';
import type { ChessboardRef } from './context/board-refs-context';
import {
  ChessboardProps,
  ChessboardPropsContextProvider,
  ChessMoveInfo,
  DEFAULT_BOARD_SIZE,
} from './context/props-context';
import { useChessboardProps } from './context/props-context/hooks';
import type { ChessboardState } from './helpers/get-chessboard-state';
import { useReversePiecePosition } from './notation';

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  },
});

const Chessboard: React.FC = React.memo(() => {
  const { boardSize } = useChessboardProps();
  const { isBlackPiecePosition } = useReversePiecePosition();

  const transform = useMemo(() => {
    if (isBlackPiecePosition) {
      return { rotate: '180deg' };
    }

    return { rotate: '0deg' };
  }, [isBlackPiecePosition]);

  return (
    <View
      style={[
        styles.container,
        {
          width: boardSize,
          transform: [transform],
        },
      ]}
    >
      <Background />
      <Pieces />
      <HighlightedSquares />
      <SuggestedDots />
    </View>
  );
});

const ChessboardContainerComponent = React.forwardRef<
  ChessboardRef,
  ChessboardProps
>((props, ref) => {
  const chessboardRef = useRef<ChessboardRef>(null);

  useImperativeHandle(
    ref,
    () => ({
      move: (params) => chessboardRef.current?.move?.(params),
      highlight: (params) => chessboardRef.current?.highlight(params),
      resetAllHighlightedSquares: () =>
        chessboardRef.current?.resetAllHighlightedSquares(),
      getState: () => chessboardRef?.current?.getState() as ChessboardState,
      resetBoard: (params) => chessboardRef.current?.resetBoard(params),
      undo: () => chessboardRef.current?.undo(),
    }),
    []
  );

  return (
    <GestureHandlerRootView>
      <ChessboardPropsContextProvider {...props}>
        <ChessboardContextProvider ref={chessboardRef} fen={props.fen}>
          <Chessboard />
        </ChessboardContextProvider>
      </ChessboardPropsContextProvider>
    </GestureHandlerRootView>
  );
});

const ChessboardContainer = React.memo(ChessboardContainerComponent);

export { DEFAULT_BOARD_SIZE };
export type { ChessboardRef, ChessboardProps, ChessMoveInfo, ChessboardState };
export default ChessboardContainer;
