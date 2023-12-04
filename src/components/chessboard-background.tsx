/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useChessboardProps } from '../context/props-context/hooks';
import { useReversePiecePosition } from '../notation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

type BackgroundProps = {
  letters: boolean;
  numbers: boolean;
};

interface BaseProps extends BackgroundProps {
  white: boolean;
}

interface RowProps extends BaseProps {
  row: number;
}

interface SquareProps extends RowProps {
  col: number;
}

const Square = React.memo(
  ({ white, row, col, letters, numbers }: SquareProps) => {
    const { colors } = useChessboardProps();
    const { isBlackPiecePosition } = useReversePiecePosition();
    const backgroundColor = white ? colors.black : colors.white;
    const textStyle: StyleProp<TextStyle> = {
      fontWeight: '400' as const,
      fontSize: 8,
      color: colors.text,
    };

    if (isBlackPiecePosition) {
      //@ts-ignore
      textStyle.transform = 'rotate(180deg)';
    }

    const newCol = isBlackPiecePosition ? col === 7 : col === 0;
    const newRow = isBlackPiecePosition ? row === 0 : row === 7;

    const wrapperStyles: StyleProp<ViewStyle> = useMemo(() => {
      const commonStyles: StyleProp<ViewStyle> = {
        flex: 1,
        backgroundColor,
        padding: 2,
        justifyContent: 'space-between',
      };

      if (isBlackPiecePosition) {
        return {
          ...commonStyles,
          flexDirection: 'column-reverse',
        };
      }

      return commonStyles;
    }, [isBlackPiecePosition, backgroundColor]);

    const lettersStyles: StyleProp<TextStyle> = useMemo(() => {
      if (isBlackPiecePosition) {
        return { alignSelf: 'flex-start' };
      }

      return { alignSelf: 'flex-end' };
    }, [isBlackPiecePosition]);

    return (
      <View style={wrapperStyles}>
        {numbers && (
          <Text style={[textStyle, { opacity: newCol ? 1 : 0 }]}>
            {'' + (8 - row)}
          </Text>
        )}
        {newRow && letters && (
          <Text style={[textStyle, lettersStyles]}>
            {String.fromCharCode(97 + col).toUpperCase()}
          </Text>
        )}
      </View>
    );
  }
);

const Row = React.memo(({ white, row, ...rest }: RowProps) => {
  const offset = white ? 0 : 1;
  return (
    <View style={styles.container}>
      {new Array(8).fill(0).map((_, i) => (
        <Square
          {...rest}
          row={row}
          col={i}
          key={i}
          white={(i + offset) % 2 === 1}
        />
      ))}
    </View>
  );
});

const Background: React.FC = React.memo(() => {
  const { withLetters, withNumbers } = useChessboardProps();
  return (
    <View style={{ flex: 1 }}>
      {new Array(8).fill(0).map((_, i) => (
        <Row
          key={i}
          white={i % 2 === 0}
          row={i}
          letters={withLetters}
          numbers={withNumbers}
        />
      ))}
    </View>
  );
});

export default Background;
