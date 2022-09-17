import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LetterKey = ({ title, onKeyPress }: { title: string, onKeyPress: Function }) => {

  return (
    <View>
      <TouchableOpacity 
        onPress={() => onKeyPress()} style={styles.buttonStyle}>
        <Text style={styles.letterStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#818384',
    height: 58,
    width: 30,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letterStyle: {
    color: '#fff'
  }
})

export default LetterKey;
