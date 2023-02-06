import React from 'react';
import { View, StyleSheet } from 'react-native';

import LetterKey from './common/LetterKey';

import { firstRow, secondRow, thirdRow } from '../constants/alphabet';

const KeyboardSection = () => {
  const { container, rowContainer } = styles;

  const renderRow = (rowCharacters: string[]) => {
    const keys: React.ReactElement[] = [];

    rowCharacters.forEach((letter: string, i: number) => {
      keys.push(<LetterKey key={i} title={letter} />);
    });

    return keys;
  };

  return (
    <View style={container}>
      <View style={rowContainer}>{renderRow(firstRow)}</View>
      <View style={rowContainer}>{renderRow(secondRow)}</View>
      <View style={rowContainer}>{renderRow(thirdRow)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
});

export default KeyboardSection;
