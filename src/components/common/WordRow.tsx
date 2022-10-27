import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { WHITE, DARK_GRAY } from '../../colors';

const WordRow = (props: any) => {

  const { container, letterBoxStyle } = styles;
  
  return (
    <View style={container}>
      <TextInput
        textAlign='center'
        caretHidden={true}
        style={letterBoxStyle} 
        maxLength={1} />

      <TextInput
        textAlign='center'
        caretHidden={true}
        style={letterBoxStyle} 
        maxLength={1} />

      <TextInput 
        textAlign='center'
        caretHidden={true}
        style={letterBoxStyle} 
        maxLength={1} />

      <TextInput 
        textAlign='center'
        caretHidden={true}
        style={letterBoxStyle} 
        maxLength={1} />

      <TextInput 
        textAlign='center'
        caretHidden={true}
        style={letterBoxStyle} 
        maxLength={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  letterBoxStyle: {
    color: WHITE,
    borderColor: DARK_GRAY,
    borderWidth: 2,
    width: 64,
    height: 64,
    margin: 3
  }
})

export default WordRow;
