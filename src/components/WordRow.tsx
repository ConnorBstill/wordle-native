import { useState, useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, TextInput } from 'react-native';

import { useAtomValue } from 'jotai';
import {
  correctWordAtom,
  letterPositionAtom,
  guessNumberAtom,
  enteredLetterAtom,
} from '../jotai-store';

import { WHITE_COLOR, DARK_GRAY, GREEN_COLOR, DARK_YELLOW, BLACK_COLOR } from '../colors';

const WordRow = (props: { row: number }) => {
  const correctWord = useAtomValue(correctWordAtom);
  const guessNumber = useAtomValue(guessNumberAtom);
  const enteredLetter = useAtomValue(enteredLetterAtom);
  const letterPosition = useAtomValue(letterPositionAtom);

  const [currentLetterPosition, setCurrentLetterPosition] = useState(-1);
  const [wordState, setWordState] = useState('');

  const [letterBackgrounds, setLetterBackgrounds] = useState([
    { id: 1, color: BLACK_COLOR },
    { id: 2, color: BLACK_COLOR },
    { id: 3, color: BLACK_COLOR },
    { id: 4, color: BLACK_COLOR },
    { id: 5, color: BLACK_COLOR },
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
            prevBackgroundsCopy[letterIndex].color = GREEN_COLOR;
          } else if (includesLetter && correctWord[letterIndex] !== letter) {
            prevBackgroundsCopy[letterIndex].color = DARK_YELLOW;
          }

          if (!includesLetter) prevBackgroundsCopy[letterIndex].color = DARK_GRAY;

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
    const { row } = props;

    if (row === guessNumber && letterPosition > currentLetterPosition) {
      // Add letter
      setWordState((prevWord) => updateWord(letterPosition, 1, prevWord, enteredLetter));
    } else if (row === guessNumber && letterPosition < currentLetterPosition) {
      // Remove letter
      setWordState((prevWord) => updateWord(letterPosition + 1, -1, prevWord));
    }
  }, [letterPosition]);

  useEffect(() => {
    const { row } = props;

    if (guessNumber - 1 === row) startLetterAnimation(0);
  }, [guessNumber]);

  const renderLetterInputs = () => {
    return letterBackgrounds.map(({ id, color }, index) => (
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
          style={[letterInputStyle, { backgroundColor: color }]}
          maxLength={1}
          editable={false}
        />
      </Animated.View>
    ));
  };

  return <View style={container}>{renderLetterInputs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  letterInputStyle: {
    color: WHITE_COLOR,
    fontSize: 38,
    borderColor: DARK_GRAY,
    borderWidth: 2,
    width: 64,
    height: 64,
    margin: 3,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
});

export default WordRow;
