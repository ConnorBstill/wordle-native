import { useMemo, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

import { DarkModeContext } from '../../DarkModeContext';
import { useAtom } from 'jotai';
import {
  correctWordAtom,
  letterPositionAtom,
  guessedWordsAtom,
  currentWordAtom,
  enteredLetterAtom,
  guessNumberAtom,
  gameIsOverAtom,
  gameIsStartedAtom,
} from '../../jotai-store';

import {
  WHITE_COLOR,
  GREEN_COLOR,
  DARK_YELLOW,
  GRAY_COLOR,
  DARK_GRAY,
  BLACK_COLOR,
  LIGHT_GRAY,
  LIGHTEST_GRAY,
} from '../../colors';
import { WORDS } from '../../lib/words';

import { showToast } from '../../lib/utils';

interface LetterKeyProps {
  keyTitle: string;
}

const LetterKey = ({ keyTitle }: LetterKeyProps) => {
  const { darkTheme } = useContext(DarkModeContext);

  const [correctWord] = useAtom(correctWordAtom);
  const [gameIsOver, setGameIsOver] = useAtom(gameIsOverAtom);
  const [guessNumber, setGuessNumber] = useAtom(guessNumberAtom);
  const [guessedWords, setGuessedWords] = useAtom(guessedWordsAtom);
  const [letterPosition, setLetterPosition] = useAtom(letterPositionAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);
  const [enteredLetter, setEnteredLetter] = useAtom(enteredLetterAtom);
  const [gameIsStarted, setGameIsStarted] = useAtom(gameIsStartedAtom);

  const themeColorsConfig = useMemo(() => {
    const isDarkTheme = darkTheme === 'on';

    return {
      charNotGuessed: isDarkTheme ? GRAY_COLOR : LIGHTEST_GRAY,
      charGuessedNotInWord: GRAY_COLOR,
      charInRightPlace: GREEN_COLOR,
      charInWordNotRightPlace: DARK_YELLOW,
      charDefaultText: isDarkTheme ? WHITE_COLOR : BLACK_COLOR,
    };
  }, [darkTheme]);

  const setTextColor = () => {
    const { charDefaultText } = themeColorsConfig;

    let color = WHITE_COLOR;

    guessedWords.forEach((word: string) => {
      const letterGuessed = word.indexOf(keyTitle) !== -1;

      if (!letterGuessed) color = charDefaultText;
    });

    return { color };
  };

  const setKeyBackground = () => {
    const {
      charNotGuessed,
      charGuessedNotInWord,
      charInRightPlace,
      charInWordNotRightPlace,
    } = themeColorsConfig;

    let backgroundColor = charNotGuessed;

    const letterInCorrectWord = correctWord.indexOf(keyTitle) !== -1;

    guessedWords.forEach((word: string) => {
      const letterInCorrectSpot =
        correctWord.indexOf(keyTitle) === word.indexOf(keyTitle);
      const letterGuessed = word.indexOf(keyTitle) !== -1;

      if (letterInCorrectWord && letterInCorrectSpot) {
        backgroundColor = charInRightPlace;
      } else if (letterGuessed && letterInCorrectWord && !letterInCorrectSpot) {
        backgroundColor = charInWordNotRightPlace;
      } else if (letterGuessed && !letterInCorrectWord) {
        backgroundColor = charGuessedNotInWord;
      }
    });

    return { backgroundColor };
  };

  const { buttonStyle, letterStyle } = styles;

  const setKeyWidth = () => {
    return { width: keyTitle.length > 1 ? 50 : 32 };
  };

  const handleKeyPress = () => {
    if (gameIsOver) return;

    if (keyTitle === 'backspace-outline') {
      removeLetter();
    } else if (keyTitle === 'ENTER') {
      handleEnterPress();
    } else {
      if (letterPosition < 4) {
        if (!gameIsStarted) setGameIsStarted(true);
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
      setGameIsOver(true);
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
      setGameIsOver(true);
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
      return (
        <Icon
          name={keyTitle}
          type="ionicon"
          color={darkTheme === 'on' ? WHITE_COLOR : BLACK_COLOR}
        />
      );
    } else {
      return <Text style={[letterStyle, setTextColor()]}>{keyTitle}</Text>;
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleKeyPress()}
        style={[{ ...buttonStyle, ...setKeyWidth(), ...setKeyBackground() }]}
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
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
});

export default LetterKey;
