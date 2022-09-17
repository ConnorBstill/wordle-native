import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import WordRow from './WordRow';

const WordGuesses = (props: any) => {

  return (
    <View style={styles.container}>
      <WordRow />
      <WordRow />
      <WordRow />
      <WordRow />
      <WordRow />
      <WordRow />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});

export default WordGuesses
