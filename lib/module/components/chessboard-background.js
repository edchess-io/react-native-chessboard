function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useChessboardProps } from '../context/props-context/hooks';
import { useReversePiecePosition } from '../notation';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
});
const Square = /*#__PURE__*/React.memo(_ref => {
  let {
    white,
    row,
    col,
    letters,
    numbers
  } = _ref;
  const {
    colors
  } = useChessboardProps();
  const {
    isBlackPiecePosition
  } = useReversePiecePosition();
  const backgroundColor = white ? colors.black : colors.white;
  const textStyle = {
    fontWeight: '400',
    fontSize: 8,
    color: colors.text
  };

  if (isBlackPiecePosition) {
    //@ts-ignore
    textStyle.transform = 'rotate(180deg)';
  }

  const newCol = isBlackPiecePosition ? col === 7 : col === 0;
  const newRow = isBlackPiecePosition ? row === 0 : row === 7;
  const wrapperStyles = useMemo(() => {
    const commonStyles = {
      flex: 1,
      backgroundColor,
      padding: 2,
      justifyContent: 'space-between'
    };

    if (isBlackPiecePosition) {
      return { ...commonStyles,
        flexDirection: 'column-reverse'
      };
    }

    return commonStyles;
  }, [isBlackPiecePosition, backgroundColor]);
  const lettersStyles = useMemo(() => {
    if (isBlackPiecePosition) {
      return {
        alignSelf: 'flex-start'
      };
    }

    return {
      alignSelf: 'flex-end'
    };
  }, [isBlackPiecePosition]);
  return /*#__PURE__*/React.createElement(View, {
    style: wrapperStyles
  }, numbers && /*#__PURE__*/React.createElement(Text, {
    style: [textStyle, {
      opacity: newCol ? 1 : 0
    }]
  }, '' + (8 - row)), newRow && letters && /*#__PURE__*/React.createElement(Text, {
    style: [textStyle, lettersStyles]
  }, String.fromCharCode(97 + col).toUpperCase()));
});
const Row = /*#__PURE__*/React.memo(_ref2 => {
  let {
    white,
    row,
    ...rest
  } = _ref2;
  const offset = white ? 0 : 1;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, new Array(8).fill(0).map((_, i) => /*#__PURE__*/React.createElement(Square, _extends({}, rest, {
    row: row,
    col: i,
    key: i,
    white: (i + offset) % 2 === 1
  }))));
});
const Background = /*#__PURE__*/React.memo(() => {
  const {
    withLetters,
    withNumbers
  } = useChessboardProps();
  return /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, new Array(8).fill(0).map((_, i) => /*#__PURE__*/React.createElement(Row, {
    key: i,
    white: i % 2 === 0,
    row: i,
    letters: withLetters,
    numbers: withNumbers
  })));
});
export default Background;
//# sourceMappingURL=chessboard-background.js.map