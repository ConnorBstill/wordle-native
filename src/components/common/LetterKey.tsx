import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { inputLetter, removeLetter, guessWord } from '../../redux/actions/GuessActions';

import {
  WHITE_COLOR,
  GREEN_COLOR,
  DARK_YELLOW,
  GRAY_COLOR,
  DARK_GRAY,
} from '../../colors';

interface LetterKeyProps {
  title: string;
}

const LetterKey = ({ title }: LetterKeyProps) => {
  const { correctWord, guessedWords } = useAppSelector((state) => state.letters);
  const dispatch = useAppDispatch();

  const setKeyBackground = () => {
    let color = GRAY_COLOR;
    const letterInCorrectWord = correctWord.indexOf(title) !== -1;

    guessedWords.forEach((word: string) => {
      const letterInCorrectSpot = correctWord.indexOf(title) === word.indexOf(title);
      const letterGuessed = word.indexOf(title) !== -1;

      if (letterInCorrectWord && letterInCorrectSpot) {
        color = GREEN_COLOR;
      } else if (letterGuessed && letterInCorrectWord && !letterInCorrectSpot) {
        color = DARK_YELLOW;
      } else if (letterGuessed && !letterInCorrectWord) {
        color = DARK_GRAY;
      }
    });

    return { backgroundColor: color };
  };

  const keyBackground = useMemo<{ backgroundColor: string }>(
    () => setKeyBackground(),
    [guessedWords.length]
  );

  const { buttonStyle, letterStyle } = styles;

  const handlePress = () => {
    if (title === 'backspace-outline') {
      dispatch(removeLetter());
    } else if (title === 'ENTER') {
      dispatch(guessWord());
    } else {
      dispatch(inputLetter(title));
    }
  };

  const setKeyWidth = () => {
    return { width: title.length > 1 ? 50 : 32 };
  };

  const renderLabel = () => {
    if (title === 'backspace-outline') {
      return <Icon name={title} type="ionicon" color={WHITE_COLOR} />;
    } else {
      return <Text style={letterStyle}>{title}</Text>;
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handlePress()}
        style={[{ ...buttonStyle, ...setKeyWidth() }, keyBackground]}
      >
        {renderLabel()}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: GRAY_COLOR,
    height: 58,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  widerButton: {},
  letterStyle: {
    color: WHITE_COLOR,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
});

export default LetterKey;
