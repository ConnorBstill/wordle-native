import { useMemo, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

import { DarkModeContext } from '../../providers/DarkModeContext';
import { ColorblindModeContext } from '../../providers/ColorBlindModeContext';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import {
  correctWordAtom,
  letterPositionAtom,
  guessedWordsAtom,
  currentWordAtom,
  enteredLetterAtom,
  guessNumberAtom,
  gameIsOverAtom,
  gameIsStartedAtom,
  hardModeEnabledAtom,
  guessedLettersInCorrectWordAtom,
} from '../../jotai-store';

import {
  WHITE_COLOR,
  GRAY_COLOR,
  DARK_GRAY,
  BLACK_COLOR,
  LIGHTEST_GRAY,
} from '../../colors';
import { WORDS } from '../../lib/words';

import { showToast, getMainColors } from '../../lib/utils';

interface LetterKeyProps {
  keyTitle: string;
}

const LetterKey = ({ keyTitle }: LetterKeyProps) => {
  const { isDarkTheme } = useContext(DarkModeContext);
  const { isColorblindMode } = useContext(ColorblindModeContext);

  const setEnteredLetter = useSetAtom(enteredLetterAtom);
  const isHardMode = useAtomValue(hardModeEnabledAtom);

  const [correctWord] = useAtom(correctWordAtom);
  const [gameIsOver, setGameIsOver] = useAtom(gameIsOverAtom);
  const [guessNumber, setGuessNumber] = useAtom(guessNumberAtom);
  const [letterPosition, setLetterPosition] = useAtom(letterPositionAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);
  const [gameIsStarted, setGameIsStarted] = useAtom(gameIsStartedAtom);
  const [guessedWords, setGuessedWords] = useAtom(guessedWordsAtom);
  const [guessedLettersInCorrectWord, setGuessedLettersInCorrectWord] = useAtom(
    guessedLettersInCorrectWordAtom
  );

  const letterInCorrectWord = correctWord.indexOf(keyTitle) !== -1;

  const themeColorsConfig = useMemo(() => {
    const { primaryColor, secondaryColor } = getMainColors(isDarkTheme, isColorblindMode);

    return {
      charNotGuessed: isDarkTheme ? GRAY_COLOR : LIGHTEST_GRAY,
      charGuessedNotInWord: isDarkTheme ? DARK_GRAY : GRAY_COLOR,
      charInRightPlace: primaryColor,
      charInWordNotRightPlace: secondaryColor,
      charDefaultText: isDarkTheme ? WHITE_COLOR : BLACK_COLOR,
    };
  }, [isDarkTheme, isColorblindMode]);

  const setTextColor = () => {
    const { charDefaultText } = themeColorsConfig;

    let color = charDefaultText;

    if (guessedWords.length) {
      guessedWords.forEach((word: string) => {
        const letterGuessed = word.indexOf(keyTitle) !== -1;

        if (
          (letterGuessed && !isColorblindMode) ||
          (letterGuessed && !letterInCorrectWord)
        ) {
          color = WHITE_COLOR;
        } else if (letterGuessed && isColorblindMode && letterInCorrectWord) {
          color = BLACK_COLOR;
        }
      });
    }

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

    guessedWords.forEach((guessedWord: string) => {
      const guessedWordLetterIndex = guessedWord.indexOf(keyTitle);

      const letterInCorrectSpot =
        correctWord.indexOf(keyTitle) === guessedWordLetterIndex ||
        correctWord.indexOf(keyTitle) ===
          guessedWord.indexOf(keyTitle, guessedWordLetterIndex + 1);
      const letterGuessed = guessedWord.indexOf(keyTitle) !== -1;

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

  useEffect(() => {
    let guessedLetters: string[] = [];

    for (let i = 0; i < guessedWords.length; i++) {
      const guessedWord = guessedWords[i];
      const letterGuessed = guessedWord.indexOf(keyTitle) !== -1;

      if (letterGuessed && letterInCorrectWord) {
        guessedLetters.push(keyTitle);
      }
    }

    setGuessedLettersInCorrectWord((prevLetters) => [...prevLetters, ...guessedLetters]);
  }, [guessedWords]);

  const handleEnterPress = () => {
    if (currentWord.length < 5) {
      showToast('Not enough letters');
      return;
    }

    if (isHardMode && gameIsStarted && guessNumber > 1) {
      let usedHints = false;

      guessedLettersInCorrectWord.forEach((letter) => {
        if (currentWord.includes(letter)) usedHints = true;
      });

      if (!usedHints) {
        showToast('Must use all available hints');
        return;
      }
    }

    if (!WORDS.includes(currentWord.toLowerCase())) {
      showToast('Not in word list');
      return;
    }

    if (currentWord === correctWord) {
      setGameIsOver(true);
      showToast('You did it!');
    }

    if (guessNumber === 6) {
      setGameIsOver(true);
      showToast(correctWord);
    }

    if (guessNumber <= 6) {
      setGameIsStarted(true);
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
          color={isDarkTheme ? WHITE_COLOR : BLACK_COLOR}
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
