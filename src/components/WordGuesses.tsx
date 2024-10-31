import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

import WordRow from './common/WordRow';
import ScreenModal from './common/ScreenModal';

const WordGuesses = (props: any) => {
  const [gameOverModalVisible, toggleGameOverModal] = useState(false);
  const buttonclick = () => {
    console.log('BUTTON CLICK')
    toggleGameOverModal((prevVal) => !prevVal)
  }
  return (
    <View style={styles.container}>
      <WordRow row={1} />
      <WordRow row={2} />
      <WordRow row={3} />
      <WordRow row={4} />
      <WordRow row={5} />
      <WordRow row={6} />

      <TouchableOpacity style={{backgroundColor: 'red'}} onPress={() => buttonclick()}><Text>MODAL</Text></TouchableOpacity>

      {/* <ScreenModal visible={gameOverModalVisible} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
});

export default WordGuesses;
