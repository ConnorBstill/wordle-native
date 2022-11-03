import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { inputLetter } from '../../redux/actions/GuessActions';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

import { WHITE } from '../../colors';

const LetterKey = ({ title }: { title: string }) => {
  const { buttonStyle, letterStyle } = styles;

  const storeState = useSelector((state: any) => {
    console.log('state', state)
    return state.letters
  });

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

  const handlePress = () => {
    console.log('handlePress', storeState)
    if (title.length > 1) {

    } else {
      inputLetter(title)
    }
  }

  return (
    <View>
      <TouchableOpacity 
        onPress={() => handlePress()} 
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
