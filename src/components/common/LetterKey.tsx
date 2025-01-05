import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

import { useAtom } from 'jotai';
import {
  correctWordAtom,
  letterPositionAtom,
  guessedWordsAtom,
  currentWordAtom,
  enteredLetterAtom,
  guessNumberAtom,
} from '../../jotai';

import {
  WHITE_COLOR,
  GREEN_COLOR,
  DARK_YELLOW,
  GRAY_COLOR,
  DARK_GRAY,
} from '../../colors';
import { WORDS } from '../../lib/words';

import { showToast } from '../../lib/utils';

interface LetterKeyProps {
  keyTitle: string;
}

const LetterKey = ({ keyTitle }: LetterKeyProps) => {
  const [correctWord] = useAtom(correctWordAtom);
  const [guessNumber, setGuessNumber] = useAtom(guessNumberAtom);
  const [guessedWords, setGuessedWords] = useAtom(guessedWordsAtom);
  const [letterPosition, setLetterPosition] = useAtom(letterPositionAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);
  const [enteredLetter, setEnteredLetter] = useAtom(enteredLetterAtom);

  const setKeyBackground = () => {
    let color = GRAY_COLOR;
    const letterInCorrectWord = correctWord.indexOf(keyTitle) !== -1;

    guessedWords.forEach((word: string) => {
      const letterInCorrectSpot =
        correctWord.indexOf(keyTitle) === word.indexOf(keyTitle);
      const letterGuessed = word.indexOf(keyTitle) !== -1;

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

  const setKeyWidth = () => {
    return { width: keyTitle.length > 1 ? 50 : 32 };
  };

  const handleKeyPress = () => {
    if (keyTitle === 'backspace-outline') {
      removeLetter();
    } else if (keyTitle === 'ENTER') {
      handleEnterPress();
    } else {
      if (letterPosition < 4) {
        setLetterPosition((prevPosition) => prevPosition + 1);
        setEnteredLetter(keyTitle);
        setCurrentWord((prevWord) => prevWord + keyTitle);
      }
    }
  };

  const removeLetter = () => {
    if (letterPosition > -1) {
      setLetterPosition((prevLetterPosition) => prevLetterPosition - 1);
      setCurrentWord((prevCurrentWord) =>
        prevCurrentWord.slice(0, prevCurrentWord.length - 1)
      );
    }
  };

  const handleEnterPress = () => {
    if (currentWord === correctWord) {
      showToast('You did it!');
    }

    if (currentWord.length < 5) {
      showToast('Not enough letters');
      return;
    }

    if (!WORDS.includes(currentWord.toLowerCase())) {
      showToast('Not in word list');
      return;
    }

    if (guessNumber === 6) {
      showToast(correctWord);
    }

    if (guessNumber <= 6) {
      setGuessNumber((prevGuessNumber) => prevGuessNumber + 1);
      setLetterPosition(-1);
      setCurrentWord('');
      setGuessedWords((prevGuessedWords) => prevGuessedWords.concat(currentWord));
    }
  };

  const renderLabel = () => {
    if (keyTitle === 'backspace-outline') {
      return <Icon name={keyTitle} type="ionicon" color={WHITE_COLOR} />;
    } else {
      return <Text style={letterStyle}>{keyTitle}</Text>;
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleKeyPress()}
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
