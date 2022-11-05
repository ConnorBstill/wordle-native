import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../redux/Hooks';

import { WHITE, DARK_GRAY } from '../../colors';

const WordRow = (props: { row: number }) => {
  const storeState = useAppSelector(state => state.letters);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentRow, setCurrentRow] = useState(1);
  const [wordState, setWordState] = useState({
    firstLetter: '',
    secondLetter: '',
    thirdLetter: '',
    fourthLetter: '',
    fifthLetter: '',
  });

  const { container, letterBoxStyle } = styles;

  const updateWord = (letterPosition: number, action: string, enteredLetter?: string) => {
    const wordStateMap: any = {
      '1': 'firstLetter',
      '2': 'secondLetter',
      '3': 'thirdLetter',
      '4': 'fourthLetter',
      '5': 'fifthLetter'
    }
    
    // const key = letterPosition.toString();

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

  useEffect(() => {
    const { letterPosition, enteredLetter, guessNumber } = storeState;

    if (props.row === guessNumber && letterPosition > currentPosition) {
      updateWord(letterPosition, 'ADD',  enteredLetter);
    } else if (props.row === guessNumber && letterPosition < currentPosition) {
      updateWord(letterPosition, 'REMOVE');
    }
  }, [storeState.letterPosition, storeState.guessNumber])
  
  return (
    <View style={container}>
      <TextInput
        value={wordState.firstLetter}
        textAlign='center'
        caretHidden={true}
        style={letterBoxStyle} 
        maxLength={1}
        editable={false} />

      <TextInput
        value={wordState.secondLetter}
        textAlign='center'
        caretHidden={true}
        style={letterBoxStyle} 
        maxLength={1}
        editable={false} />

      <TextInput
        value={wordState.thirdLetter}
        textAlign='center'
        caretHidden={true}
        style={letterBoxStyle} 
        maxLength={1}
        editable={false} />

      <TextInput
        value={wordState.fourthLetter}
        textAlign='center'
        caretHidden={true}
        style={letterBoxStyle} 
        maxLength={1}
        editable={false} />

      <TextInput
        value={wordState.fifthLetter}
        textAlign='center'
        caretHidden={true}
        style={letterBoxStyle} 
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
    margin: 3
  }
})

export default WordRow;
