import { useState, useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, TextInput } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

import { WHITE, DARK_GRAY, GREEN, DARK_YELLOW, BLACK } from '../../colors';

const WordRow = (props: { row: number }) => {
  const [currentLetterPosition, setCurrentLetterPosition] = useState(0);
  const [wordState, setWordState] = useState(['', '', '', '', '']);

  const [letterBackgrounds, setLetterBackgrounds] = useState([
    BLACK, BLACK, BLACK, BLACK, BLACK
  ]);

  const flipAnimationValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]).current;

  const storeState = useAppSelector((state) => state.letters);


  const { container, letterBoxStyle } = styles;

  const updateWord = (
    letterPosition: number,
    action: string,
    enteredLetter?: string
  ) => {

    console.log('updateWord', letterPosition, enteredLetter)
    if (action === 'ADD' && enteredLetter) {
      setWordState((prevWord) => {
        const prevWordCopy = prevWord.slice();
        console.log('letterPosition', letterPosition)
        prevWordCopy[letterPosition] = enteredLetter;

        return prevWordCopy;
      });
    } else {
      setWordState((prevWord) => {
        const prevWordCopy = prevWord.slice();

        prevWordCopy[letterPosition] = '';

        return prevWordCopy;
      });
    }

    setCurrentLetterPosition(letterPosition);
  };

  const setLetterBackground = (letter: string, letterIndex: number) => {
    const { correctWord, guessNumber } = storeState;

    let backgroundColor = BLACK;

    Animated.timing(
      flipAnimationValues[letterIndex],
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start(({ finished }) => {
      if (finished) {
        if (correctWord.includes(letter) && correctWord[letterIndex] === letter) {
          backgroundColor = GREEN;
        } else if (
          correctWord.includes(letter) &&
          correctWord[letterIndex] !== letter
        ) {
          backgroundColor = DARK_YELLOW;
        }
      }
    })

    return { backgroundColor }
  }

  const animatedTiming = (letterIndex: number, toValue: number) => {
    return Animated.timing(
      flipAnimationValues[letterIndex],
      {
        toValue,
        duration: 1000,
        useNativeDriver: true
      })
  }

  const singleLetterAnimation = (letterIndex: number): any => {
    if (letterIndex > 4) return;

    for (let i = 0; i <= letterBackgrounds.length - 1; i++) {
      animatedTiming(letterIndex, 1).start(({ finished }) => {
        if (finished) {
          const { correctWord, guessNumber } = storeState;
  
          setLetterBackgrounds((prevBackgrounds) => {
            const prevBackgroundsCopy = prevBackgrounds.slice();
            const letter = wordState[letterIndex]
  
            if (
              correctWord.includes(letter) && 
              correctWord[letterIndex] === letter) {

              prevBackgroundsCopy[letterIndex] = GREEN;
            } else if (
              correctWord.includes(letter) && 
              correctWord[letterIndex] !== letter) {
              
              prevBackgroundsCopy[letterIndex] = DARK_YELLOW;
            }

            return prevBackgroundsCopy;
          });
        }
      });
    }
  }

  const triggerGuessAnimation = () => {
    const { guessNumber } = storeState;
    const { row } = props;

    if ((guessNumber - 1) === row) {
      console.log('triggerGuessAnimation', guessNumber);
      singleLetterAnimation(0)
    }
  }

  useEffect(() => {
    const { letterPosition, enteredLetter, guessNumber } = storeState;
    console.log(letterPosition, currentLetterPosition)
    if (props.row === guessNumber && letterPosition > currentLetterPosition) {
      updateWord(letterPosition, 'ADD', enteredLetter);
    } else if (props.row === guessNumber && letterPosition < currentLetterPosition) {
      updateWord(letterPosition, 'REMOVE');
    }
  }, [storeState.letterPosition]);

  useEffect(() => {
    const { guessNumber } = storeState;

    triggerGuessAnimation();
  }, [storeState.guessNumber]);

  return (
    <View style={container}>
      <Animated.View style={{ 
        transform: [{
          rotateX: flipAnimationValues[0].interpolate({
            inputRange: [0, 2],
            outputRange: ['0deg', '360deg']
          })
        }] }}>
        <TextInput
          value={wordState[0]}
          textAlign="center"
          caretHidden={true}
          style={[
            letterBoxStyle, 
            { backgroundColor: letterBackgrounds[0] }
          ]}
          maxLength={1}
          editable={false}
        />
      </Animated.View>

      <TextInput
        value={wordState[1]}
        textAlign="center"
        caretHidden={true}
        style={[letterBoxStyle, { backgroundColor: letterBackgrounds[1] }]}
        maxLength={1}
        editable={false}
      />

      <TextInput
        value={wordState[2]}
        textAlign="center"
        caretHidden={true}
        style={[letterBoxStyle, { backgroundColor: letterBackgrounds[2] }]}
        maxLength={1}
        editable={false}
      />

      <TextInput
        value={wordState[3]}
        textAlign="center"
        caretHidden={true}
        style={[letterBoxStyle, { backgroundColor: letterBackgrounds[3] }]}
        maxLength={1}
        editable={false}
      />

      <TextInput
        value={wordState[4]}
        textAlign="center"
        caretHidden={true}
        style={[letterBoxStyle, { backgroundColor: letterBackgrounds[4] }]}
        maxLength={1}
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  letterBoxStyle: {
    color: WHITE,
    fontSize: 38,
    borderColor: DARK_GRAY,
    borderWidth: 2,
    width: 64,
    height: 64,
    margin: 3,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    // transform: [{ rotateX: '45deg' }]
  },
});

export default WordRow;
