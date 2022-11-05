import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import WordRow from './common/WordRow';

const WordGuesses = (props: any) => {

  return (
    <View style={styles.container}>
      <WordRow row={1} />
      <WordRow row={2} />
      <WordRow row={3} />
      <WordRow row={4} />
      <WordRow row={5} />
      <WordRow row={6} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  }
});

export default WordGuesses
