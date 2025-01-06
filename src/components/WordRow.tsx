import { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { Animated, View, StyleSheet, TextInput } from 'react-native';

import { DarkModeContext } from '../DarkModeContext';
import { useAtomValue } from 'jotai';
import {
  correctWordAtom,
  letterPositionAtom,
  guessNumberAtom,
  enteredLetterAtom,
} from '../jotai-store';

import {
  WHITE_COLOR,
  DARK_GRAY,
  GREEN_COLOR,
  DARK_YELLOW,
  BLACK_COLOR,
  LIGHT_GRAY,
} from '../colors';

const WordRow = ({ row }: { row: number }) => {
  const correctWord = useAtomValue(correctWordAtom);
  const guessNumber = useAtomValue(guessNumberAtom);
  const enteredLetter = useAtomValue(enteredLetterAtom);
  const letterPosition = useAtomValue(letterPositionAtom);

  const [currentLetterPosition, setCurrentLetterPosition] = useState(-1);
  const [wordState, setWordState] = useState('');

  const { darkTheme } = useContext(DarkModeContext);

  const inputsDefaultBackgroundColor = useMemo(() => {
    return darkTheme === 'on' ? BLACK_COLOR : WHITE_COLOR;
  }, [darkTheme]);

  const [letterBackgrounds, setLetterBackgrounds] = useState([
    { id: 1, backgroundColor: inputsDefaultBackgroundColor },
    { id: 2, backgroundColor: inputsDefaultBackgroundColor },
    { id: 3, backgroundColor: inputsDefaultBackgroundColor },
    { id: 4, backgroundColor: inputsDefaultBackgroundColor },
    { id: 5, backgroundColor: inputsDefaultBackgroundColor },
  ]);

  const flipAnimationValues = useRef([
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

  const animatedFlipTiming = (letterIndex: number, toValue: number) => {
    return Animated.timing(flipAnimationValues[letterIndex], {
      toValue,
      duration: 175,
      useNativeDriver: true,
    });
  };

  // Animates each letter sequentially after a guess
  const startLetterAnimation = (letterIndex: number): any => {
    if (letterIndex > 4) return;

    // Rotate halfway
    animatedFlipTiming(letterIndex, 1).start(({ finished }) => {
      if (finished) {
        setLetterBackgrounds((prevBackgrounds) => {
          const prevBackgroundsCopy = prevBackgrounds.slice();
          const letter = wordState[letterIndex];
          const includesLetter = correctWord.includes(letter);

          if (includesLetter && correctWord[letterIndex] === letter) {
            prevBackgroundsCopy[letterIndex].backgroundColor = GREEN_COLOR;
          } else if (includesLetter && correctWord[letterIndex] !== letter) {
            prevBackgroundsCopy[letterIndex].backgroundColor = DARK_YELLOW;
          }

          if (!includesLetter)
            prevBackgroundsCopy[letterIndex].backgroundColor = DARK_GRAY;

          return prevBackgroundsCopy;
        });

        // Rotate back after setting background color and go to next letter
        animatedFlipTiming(letterIndex, 0).start(({ finished }) => {
          if (finished) startLetterAnimation(letterIndex + 1);
        });
      }
    });
  };

  useEffect(() => {
    if (row === guessNumber && letterPosition > currentLetterPosition) {
      // Add letter
      setWordState((prevWord) => updateWord(letterPosition, 1, prevWord, enteredLetter));
    } else if (row === guessNumber && letterPosition < currentLetterPosition) {
      // Remove letter
      setWordState((prevWord) => updateWord(letterPosition + 1, -1, prevWord));
    }
  }, [letterPosition]);

  useEffect(() => {
    if (guessNumber - 1 === row) startLetterAnimation(0);
  }, [guessNumber]);

  // useEffect(() => {
  //   const inputsDefaultBackgroundColor = darkTheme === 'on' ? BLACK_COLOR : WHITE_COLOR;

  //   setLetterBackgrounds([
  //     { id: 1, backgroundColor: inputsDefaultBackgroundColor },
  //     { id: 2, backgroundColor: inputsDefaultBackgroundColor },
  //     { id: 3, backgroundColor: inputsDefaultBackgroundColor },
  //     { id: 4, backgroundColor: inputsDefaultBackgroundColor },
  //     { id: 5, backgroundColor: inputsDefaultBackgroundColor },
  //   ])
  // }, [darkTheme])

  const renderLetterInputs = () => {
    return letterBackgrounds.map(({ id, backgroundColor }, index) => {
      let borderColor = DARK_GRAY;
      let textColor = WHITE_COLOR;

      const backgroundIsDefault =
        backgroundColor === BLACK_COLOR || backgroundColor === WHITE_COLOR;

      if (!backgroundIsDefault) {
        borderColor = backgroundColor;
      } else if (backgroundIsDefault && wordState[index]) {
        borderColor = LIGHT_GRAY;
      }

      if (backgroundIsDefault && darkTheme !== 'on') {
        textColor = BLACK_COLOR;
      }

      return (
        <Animated.View
          key={`${id}`}
          style={{
            transform: [
              {
                rotateX: flipAnimationValues[index].interpolate({
                  inputRange: [0, 2],
                  outputRange: ['0deg', '180deg'],
                }),
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
                  ? inputsDefaultBackgroundColor
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
    borderWidth: 2,
    width: 64,
    height: 64,
    margin: 3,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
});

export default WordRow;
