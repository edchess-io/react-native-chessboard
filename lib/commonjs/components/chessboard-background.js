"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _hooks = require("../context/props-context/hooks");

var _notation = require("../notation");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
});

const Square = /*#__PURE__*/_react.default.memo(_ref => {
  let {
    white,
    row,
    col,
    letters,
    numbers
  } = _ref;
  const {
    colors
  } = (0, _hooks.useChessboardProps)();
  const {
    isBlackPiecePosition
  } = (0, _notation.useReversePiecePosition)();
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
  const wrapperStyles = (0, _react.useMemo)(() => {
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
  const lettersStyles = (0, _react.useMemo)(() => {
    if (isBlackPiecePosition) {
      return {
        alignSelf: 'flex-start'
      };
    }

    return {
      alignSelf: 'flex-end'
    };
  }, [isBlackPiecePosition]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: wrapperStyles
  }, numbers && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [textStyle, {
      opacity: newCol ? 1 : 0
    }]
  }, '' + (8 - row)), newRow && letters && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [textStyle, lettersStyles]
  }, String.fromCharCode(97 + col).toUpperCase()));
});

const Row = /*#__PURE__*/_react.default.memo(_ref2 => {
  let {
    white,
    row,
    ...rest
  } = _ref2;
  const offset = white ? 0 : 1;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, new Array(8).fill(0).map((_, i) => /*#__PURE__*/_react.default.createElement(Square, _extends({}, rest, {
    row: row,
    col: i,
    key: i,
    white: (i + offset) % 2 === 1
  }))));
});

const Background = /*#__PURE__*/_react.default.memo(() => {
  const {
    withLetters,
    withNumbers
  } = (0, _hooks.useChessboardProps)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, new Array(8).fill(0).map((_, i) => /*#__PURE__*/_react.default.createElement(Row, {
    key: i,
    white: i % 2 === 0,
    row: i,
    letters: withLetters,
    numbers: withNumbers
  })));
});

var _default = Background;
exports.default = _default;
//# sourceMappingURL=chessboard-background.js.map