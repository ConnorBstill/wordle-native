import { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { Animated, View, StyleSheet, TextInput } from 'react-native';

import { DarkModeContext } from '../providers/DarkModeContext';
import { ColorblindModeContext } from '../providers/ColorBlindModeContext';
import { useAtomValue } from 'jotai';
import {
  correctWordAtom,
  letterPositionAtom,
  guessNumberAtom,
  enteredLetterAtom,
  gameIsStartedAtom,
} from '../jotai-store';

import { getMainColors } from '../lib/utils';

import {
  WHITE_COLOR,
  DARK_GRAY,
  BLACK_COLOR,
  LIGHT_GRAY,
  GRAY_COLOR,
  LIGHTEST_GRAY,
} from '../colors';

const WordRow = ({ row }: { row: number }) => {
  const { isDarkTheme } = useContext(DarkModeContext);
  const { isColorblindMode } = useContext(ColorblindModeContext);

  const gameIsStartedFlag = useAtomValue(gameIsStartedAtom);
  const correctWord = useAtomValue(correctWordAtom);
  const guessNumber = useAtomValue(guessNumberAtom);

  // When a letter is entered
  const enteredLetter = useAtomValue(enteredLetterAtom);
  const letterPosition = useAtomValue(letterPositionAtom);

  const [currentLetterPosition, setCurrentLetterPosition] = useState(-1);
  const [wordState, setWordState] = useState('');

  const themeColorsConfig = useMemo(() => {
    const { primaryColor, secondaryColor } = getMainColors(isDarkTheme, isColorblindMode);

    return {
      charGuessedNotInWord: isDarkTheme ? DARK_GRAY : GRAY_COLOR,
      charInRightPlace: primaryColor,
      charInWordNotRightPlace: secondaryColor,
      defaultBackgroundColor: isDarkTheme ? BLACK_COLOR : WHITE_COLOR,
      defaultBorderColor: isDarkTheme ? DARK_GRAY : LIGHTEST_GRAY,
      hasLetterBorderColor: isDarkTheme ? LIGHT_GRAY : GRAY_COLOR,
    };
  }, [isDarkTheme, isColorblindMode]);

  const letterBackgroundsInitial = [
    { id: 1, backgroundColor: themeColorsConfig.defaultBackgroundColor },
    { id: 2, backgroundColor: themeColorsConfig.defaultBackgroundColor },
    { id: 3, backgroundColor: themeColorsConfig.defaultBackgroundColor },
    { id: 4, backgroundColor: themeColorsConfig.defaultBackgroundColor },
    { id: 5, backgroundColor: themeColorsConfig.defaultBackgroundColor },
  ];

  const [letterBackgrounds, setLetterBackgrounds] = useState(letterBackgroundsInitial);

  const flipAnimValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const letterInputAnimValues = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  const letterBounceAnimValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const { container, letterInputStyle } = styles;

  const updateWord = (
    changedLetterPosition: number,
    wordLengthDiff: number,
    prevWord: string,
    enteredLetter: string = ''
  ) => {
    const prevWordCopy = prevWord.split('');

    prevWordCopy[changedLetterPosition] = enteredLetter;
    setCurrentLetterPosition((prevLetterPosition) => prevLetterPosition + wordLengthDiff);

    return prevWordCopy.join('');
  };

  const calculateLetterBackground = (letterIndex: number) => {
    const { charInRightPlace, charInWordNotRightPlace, charGuessedNotInWord } =
      themeColorsConfig;

    setLetterBackgrounds((prevBackgrounds) => {
      const prevBackgroundsCopy = prevBackgrounds.slice();
      const letter = wordState[letterIndex];
      const includesLetter = correctWord.includes(letter);

      if (includesLetter && correctWord[letterIndex] === letter) {
        prevBackgroundsCopy[letterIndex].backgroundColor = charInRightPlace;
      } else if (includesLetter && correctWord[letterIndex] !== letter) {
        prevBackgroundsCopy[letterIndex].backgroundColor = charInWordNotRightPlace;
      }

      if (!includesLetter)
        prevBackgroundsCopy[letterIndex].backgroundColor = charGuessedNotInWord;

      return prevBackgroundsCopy;
    });
  };

  const animateElement = (
    valueToChange: Animated.Value,
    toValue: number,
    duration: number
  ) => {
    return Animated.timing(valueToChange, {
      toValue,
      duration,
      useNativeDriver: true,
    });
  };

  const startAnimatedBounce = (letterIndex: number, toValue: number) => {
    if (letterIndex > 4) return;
    const animValue = letterBounceAnimValues[letterIndex];

    return animateElement(animValue, toValue, 150).start(({ finished }) => {
      startAnimatedBounce(letterIndex + 1, -40);

      // To recurse, or not to recurse?
      if (finished) {
        animateElement(animValue, 5, 85).start(({ finished }) => {
          if (finished) {
            animateElement(animValue, -25, 150).start(({ finished }) => {
              if (finished) {
                animateElement(animValue, 0, 170).start();
              }
            });
          }
        });
      }
    });
  };

  const startGuessLetterAnimation = (letterIndex: number): any => {
    if (letterIndex > 4 && wordState === correctWord) {
      startAnimatedBounce(0, -40);
    }
    if (letterIndex > 4) return;

    // Rotate halfway
    animateElement(flipAnimValues[letterIndex], 1, 175).start(({ finished }) => {
      if (finished) {
        // Rotate back after setting background color and go to next letter
        calculateLetterBackground(letterIndex);

        animateElement(flipAnimValues[letterIndex], 0, 175).start(({ finished }) => {
          if (finished) startGuessLetterAnimation(letterIndex + 1);
        });
      }
    });
  };

  const letterInputAnimation = (letterIndex: number) => {
    const duration = 20;
    const animValue = letterInputAnimValues[letterIndex];

    animateElement(animValue, 1.09, duration).start(({ finished }) => {
      if (finished) {
        animateElement(animValue, 1, duration).start();
      }
    });
  };

  const reset = () => {
    setWordState('');
    setLetterBackgrounds(letterBackgroundsInitial);
    setCurrentLetterPosition(-1);
  };

  // Do I really need four useEffects?
  useEffect(() => {
    if (row === guessNumber && letterPosition > currentLetterPosition) {
      // Add letter
      setWordState((prevWord) => updateWord(letterPosition, 1, prevWord, enteredLetter));
      letterInputAnimation(letterPosition);
    } else if (row === guessNumber && letterPosition < currentLetterPosition) {
      // Remove letter
      setWordState((prevWord) => updateWord(letterPosition + 1, -1, prevWord));
    }
  }, [letterPosition]);

  useEffect(() => {
    if (guessNumber - 1 !== row) return;

    startGuessLetterAnimation(0);
  }, [guessNumber]);

  useEffect(() => {
    if (guessNumber > row) {
      for (let i = 0; i < letterBackgrounds.length; i++) {
        calculateLetterBackground(i);
      }
    }
  }, [isDarkTheme, isColorblindMode]);

  useEffect(() => {
    if (!gameIsStartedFlag) {
      reset();
    }
  }, [gameIsStartedFlag]);

  const renderLetterInputs = () => {
    const {
      defaultBackgroundColor,
      defaultBorderColor,
      hasLetterBorderColor,
      charInRightPlace,
      charInWordNotRightPlace,
    } = themeColorsConfig;

    return letterBackgrounds.map(({ id, backgroundColor }, index) => {
      let borderColor = defaultBorderColor;
      let textColor = WHITE_COLOR;

      const backgroundIsDefault =
        backgroundColor === BLACK_COLOR || backgroundColor === WHITE_COLOR;

      if (!backgroundIsDefault) {
        borderColor = backgroundColor;
      } else if (backgroundIsDefault && wordState[index]) {
        borderColor = hasLetterBorderColor;
      }

      if (
        (backgroundIsDefault && !isDarkTheme) ||
        ((backgroundColor === charInRightPlace ||
          backgroundColor === charInWordNotRightPlace) &&
          isColorblindMode)
      ) {
        textColor = BLACK_COLOR;
      }

      return (
        <Animated.View
          key={`${id}`}
          style={{
            transform: [
              {
                rotateX: flipAnimValues[index].interpolate({
                  inputRange: [0, 2],
                  outputRange: ['0deg', '180deg'],
                }),
              },
              {
                scale: letterInputAnimValues[index],
              },
              {
                translateY: letterBounceAnimValues[index],
              },
            ],
          }}
        >
          <TextInput
            value={wordState[index]}
            textAlign="center"
            caretHidden={true}
            style={[
              letterInputStyle,
              {
                borderColor,
                backgroundColor: backgroundIsDefault
                  ? defaultBackgroundColor
                  : backgroundColor,
                color: textColor,
              },
            ]}
            maxLength={1}
            editable={false}
          />
        </Animated.View>
      );
    });
  };

  return <View style={container}>{renderLetterInputs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  letterInputStyle: {
    fontSize: 38,
    borderWidth: 2.5,
    width: 64,
    height: 64,
    margin: 3,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
});

export default WordRow;
