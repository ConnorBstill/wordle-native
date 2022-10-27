import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

import { WHITE } from '../../colors';

const LetterKey = ({ title, onKeyPress }: { title: string, onKeyPress: Function }) => {

  const { buttonStyle, letterStyle } = styles;

  const renderLabel = () => {
    if (title.length > 1 && title !== 'ENTER') {
      return (
        <Icon 
          name='backspace-outline'
          type='ionicon'
          color={WHITE} />
      )
    } else {
      return <Text style={letterStyle}>{title}</Text>
    }
  }

  return (
    <View>
      <TouchableOpacity 
        onPress={() => onKeyPress()} 
        style={{ ...buttonStyle, width: title.length > 1 ? 50 : 32 }}>

        {renderLabel()}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#818384',
    height: 58,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3
  },
  widerButton: {

  },
  letterStyle: {
    color: '#fff'
  }
})

export default LetterKey;
