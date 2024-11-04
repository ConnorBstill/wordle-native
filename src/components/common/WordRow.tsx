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

  // const flipAnimationValues = useRef([
  //   new Animated.Value(1),
  //   new Animated.Value(1),
  //   new Animated.Value(1),
  //   new Animated.Value(1),
  //   new Animated.Value(1)
  // ]).current;

  const storeState = useAppSelector((state) => state.letters);


  const { container, letterInputStyle } = styles;

  const updateWord = (
    letterPosition: number,
    action: string,
    enteredLetter?: string
  ) => {
    if (action === 'ADD' && enteredLetter) {
      setWordState((prevWord) => {
        const prevWordCopy = prevWord.slice();

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

  const animatedTiming = (letterIndex: number, toValue: number) => {
    return Animated.timing(
      flipAnimationValues[letterIndex],
      {
        toValue,
        duration: 175,
        useNativeDriver: true
      })
  }

  const startLetterAnimation = (letterIndex: number): any => {
    if (letterIndex > 4) return;

    animatedTiming(letterIndex, 1)
      .start(({ finished }) => {
        if (finished) {
          const { correctWord } = storeState;

          setLetterBackgrounds((prevBackgrounds) => {
            const prevBackgroundsCopy = prevBackgrounds.slice();
            const letter = wordState[letterIndex];

            if (
              correctWord.includes(letter) && 
              correctWord[letterIndex] === letter) {

              prevBackgroundsCopy[letterIndex] = GREEN;
            } else if (
              correctWord.includes(letter) && 
              correctWord[letterIndex] !== letter) {
              
              prevBackgroundsCopy[letterIndex] = DARK_YELLOW;
            }

            if (!correctWord.includes(letter)) prevBackgroundsCopy[letterIndex] = DARK_GRAY

            return prevBackgroundsCopy;
          });

          animatedTiming(letterIndex, 0).start(({ finished }) => {
            if (finished) {
              startLetterAnimation(letterIndex + 1);
            }
          });
        }
    });
  }

  useEffect(() => {
    const { letterPosition, enteredLetter, guessNumber } = storeState;
    const { row } = props;

    if (row === guessNumber && letterPosition > currentLetterPosition) {
      updateWord(letterPosition, 'ADD', enteredLetter);
    } else if (row === guessNumber && letterPosition < currentLetterPosition) {
      updateWord(letterPosition, 'REMOVE');
    }
  }, [storeState.letterPosition]);

  useEffect(() => {
    const { guessNumber } = storeState;
    const { row } = props;

    if ((guessNumber - 1) === row) startLetterAnimation(0);
  }, [storeState.guessNumber]);

  return (
    <View style={container}>
      <Animated.View style={{
        transform: [{
          rotateX: flipAnimationValues[0].interpolate({
            inputRange: [0, 2],
            outputRange: ['0deg', '180deg']
          })
          // scaleX: flipAnimationValues[0]
        }] }}>
        <TextInput
          value={wordState[0]}
          textAlign="center"
          caretHidden={true}
          style={[
            letterInputStyle, 
            { backgroundColor: letterBackgrounds[0] }
          ]}
          maxLength={1}
          editable={false}
        />
      </Animated.View>
      
      <Animated.View style={{
        transform: [{
          rotateX: flipAnimationValues[1].interpolate({
            inputRange: [0, 2],
            outputRange: ['0deg', '180deg']
          })
        }] }}>
        <TextInput
          value={wordState[1]}
          textAlign="center"
          caretHidden={true}
          style={[letterInputStyle, { backgroundColor: letterBackgrounds[1] }]}
          maxLength={1}
          editable={false}
        />
      </Animated.View>
      
      <Animated.View style={{
        transform: [{
          rotateX: flipAnimationValues[2].interpolate({
            inputRange: [0, 2],
            outputRange: ['0deg', '180deg']
          })
        }] }}>
        <TextInput
          value={wordState[2]}
          textAlign="center"
          caretHidden={true}
          style={[letterInputStyle, { backgroundColor: letterBackgrounds[2] }]}
          maxLength={1}
          editable={false}
        />
      </Animated.View>
      

      <Animated.View style={{
        transform: [{
          rotateX: flipAnimationValues[3].interpolate({
            inputRange: [0, 2],
            outputRange: ['0deg', '180deg']
          })
        }] }}>
        <TextInput
          value={wordState[3]}
          textAlign="center"
          caretHidden={true}
          style={[letterInputStyle, { backgroundColor: letterBackgrounds[3] }]}
          maxLength={1}
          editable={false}
        />
      </Animated.View>
      
      <Animated.View style={{
        transform: [{
          rotateX: flipAnimationValues[4].interpolate({
            inputRange: [0, 2],
            outputRange: ['0deg', '180deg']
          })
        }] }}>
        <TextInput
          value={wordState[4]}
          textAlign="center"
          caretHidden={true}
          style={[letterInputStyle, { backgroundColor: letterBackgrounds[4] }]}
          maxLength={1}
          editable={false}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  letterInputStyle: {
    color: WHITE,
    fontSize: 38,
    borderColor: DARK_GRAY,
    borderWidth: 2,
    width: 64,
    height: 64,
    margin: 3,
    fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },
});

export default WordRow;
