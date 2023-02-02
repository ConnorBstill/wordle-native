import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

import {
  inputLetter,
  removeLetter,
  guessWord,
} from '../../redux/actions/GuessActions';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

import { WHITE, GREEN, DARK_YELLOW, GRAY, DARK_GRAY } from '../../colors';

const LetterKey = ({ title }: { title: string }) => {
  const { guessedLetters, correctWord, guessedWords } = useAppSelector(
    (state) => state.letters
  );
  const { buttonStyle, letterStyle } = styles;

  const dispatch = useAppDispatch();

  const handlePress = () => {
    if (title === 'backspace-outline') {
      dispatch(removeLetter());
    } else if (title === 'ENTER') {
      dispatch(guessWord());
    } else {
      dispatch(inputLetter(title));
    }
  };

  const setKeyBackground = () => {
    // const { correctWord, guessNumber } = storeState;
    let color = GRAY;

    guessedWords.forEach((word: string) => {
      if (
        correctWord.indexOf(title) !== -1 &&
        correctWord.indexOf(title) === word.indexOf(title)
      ) {
        color = GREEN;
      } else if (
        word.indexOf(title) !== -1 &&
        correctWord.indexOf(title) !== -1 &&
        correctWord.indexOf(title) !== word.indexOf(title)
      ) {
        color = DARK_YELLOW;
      } else if (
        word.indexOf(title) !== -1 &&
        correctWord.indexOf(title) === -1
      ) {
        color = DARK_GRAY;
      }
    });

    return { backgroundColor: color };
  };

  const setKeyWidth = () => {
    return { width: title.length > 1 ? 50 : 32 };
  };

  const renderLabel = () => {
    if (title === 'backspace-outline') {
      return <Icon name={title} type="ionicon" color={WHITE} />;
    } else {
      return <Text style={letterStyle}>{title}</Text>;
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handlePress()}
        style={[{ ...buttonStyle, ...setKeyWidth() }, setKeyBackground()]}
      >
        {renderLabel()}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#818384',
    height: 58,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  widerButton: {},
  letterStyle: {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
});

export default LetterKey;
