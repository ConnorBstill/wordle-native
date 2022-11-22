import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

import { WHITE, DARK_GRAY, GREEN, DARK_YELLOW, BLACK } from '../../colors';

const WordRow = (props: { row: number }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [wordState, setWordState] = useState({
    firstLetter: '',
    secondLetter: '',
    thirdLetter: '',
    fourthLetter: '',
    fifthLetter: '',
  });
  const storeState = useAppSelector(state => state.letters);

  const { container, letterBoxStyle } = styles;

  const updateWord = (letterPosition: number, action: string, enteredLetter?: string) => {
    const wordStateMap: any = {
      '1': 'firstLetter',
      '2': 'secondLetter',
      '3': 'thirdLetter',
      '4': 'fourthLetter',
      '5': 'fifthLetter'
    }

    if (action === 'ADD') {
      const key = letterPosition.toString();

      setWordState((prevWord) => { 
        return { ...prevWord, [wordStateMap[key]]: enteredLetter }
      });
    } else {
      const key = (letterPosition + 1).toString();

      setWordState((prevWord) => { 
        return { ...prevWord, [wordStateMap[key]]: '' }
      });
    }
    
    setCurrentPosition(letterPosition)
  }

  const setLetterBackground = (letter: string, letterIndex: number) => {
    const { correctWord, guessNumber } = storeState;

    if (guessNumber <= props.row || !letter) {
      return { backgroundColor: BLACK }
    }

    if (correctWord.includes(letter) && correctWord[letterIndex] === letter) {
      return { backgroundColor: GREEN }
    } else if (correctWord.includes(letter) && correctWord[letterIndex] !== letter) {
      return { backgroundColor: DARK_YELLOW }
    }
  }

  useEffect(() => {
    const { letterPosition, enteredLetter, guessNumber } = storeState;

    if (props.row === guessNumber && letterPosition > currentPosition) {
      updateWord(letterPosition, 'ADD',  enteredLetter);
    } else if (props.row === guessNumber && letterPosition < currentPosition) {
      updateWord(letterPosition, 'REMOVE');
    }
  }, [storeState.letterPosition, storeState.guessNumber]);
  
  return (
    <View style={container}>
      <TextInput
        value={wordState.firstLetter}
        textAlign='center'
        caretHidden={true}
        style={[letterBoxStyle, setLetterBackground(wordState.firstLetter, 0)]} 
        maxLength={1}
        editable={false} />

      <TextInput
        value={wordState.secondLetter}
        textAlign='center'
        caretHidden={true}
        style={[letterBoxStyle, setLetterBackground(wordState.secondLetter, 1)]} 
        maxLength={1}
        editable={false} />

      <TextInput
        value={wordState.thirdLetter}
        textAlign='center'
        caretHidden={true}
        style={[letterBoxStyle, setLetterBackground(wordState.thirdLetter, 2)]} 
        maxLength={1}
        editable={false} />

      <TextInput
        value={wordState.fourthLetter}
        textAlign='center'
        caretHidden={true}
        style={[letterBoxStyle, setLetterBackground(wordState.fourthLetter, 3)]} 
        maxLength={1}
        editable={false} />

      <TextInput
        value={wordState.fifthLetter}
        textAlign='center'
        caretHidden={true}
        style={[letterBoxStyle, setLetterBackground(wordState.fifthLetter, 4)]} 
        maxLength={1}
        editable={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
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
    fontWeight: 'bold'
  }
})

export default WordRow;
