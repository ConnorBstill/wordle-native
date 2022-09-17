import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import LetterKey from './LetterKey';

import { alphabet } from '../../alphabet';

const KeyboardSection = () => {

  const onKeyPress = (letter: string) => {

  }

  const renderKeys = () => {
    const keys: React.ReactElement[] = [];

    alphabet.forEach((letter: string, i: number) => {
      keys.push(<LetterKey key={i} title={letter} onKeyPress={() => onKeyPress(letter)} />)
    });

    return keys;
  }

  return (
    <View style={styles.container}>
      {renderKeys()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap' 
    // flexShrink: 1
  }
});

export default KeyboardSection;
