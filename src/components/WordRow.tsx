import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const WordRow = (props: any) => {
  
  return (
    <View style={styles.container}>
      <TextInput style={styles.letterBoxStyle} />
      <TextInput style={styles.letterBoxStyle} />
      <TextInput style={styles.letterBoxStyle} />
      <TextInput style={styles.letterBoxStyle} />
      <TextInput style={styles.letterBoxStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  letterBoxStyle: {
    borderColor: '#3a3a3c',
    borderWidth: 2,
    width: 64,
    height: 64,
    margin: 3
  }
})

export default WordRow;
