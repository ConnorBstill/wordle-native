import Toast from 'react-native-root-toast';

import { 
  INPUT_LETTER, 
  CHANGE_FOCUSED_INPUT, 
  GUESS_WORD, 
  GO_TO_NEXT_ROW,
  REMOVE_LETTER
} from './types';
import { State } from '../reducers/LetterReducer';
import { current } from '@reduxjs/toolkit';

import { WORDS } from '../../constants/words';


interface GetStore {
  (): { letters: State }
}

export const inputLetter = (letter: string) => {
  return (dispatch: any, getStore: GetStore) => {
    const { letterPosition: currentLetterPos, currentWord, guessNumber } = getStore().letters;

    if (currentLetterPos < 5) {
      const newWord = currentWord + letter;

      dispatch({ type: CHANGE_FOCUSED_INPUT, payload: currentLetterPos + 1 });
      dispatch({ type: INPUT_LETTER, payload: { newWord, letter } });
    }
  }
}

export const removeLetter = () => {
  return (dispatch: any, getStore: GetStore) => {
    const { letterPosition: currentLetterPos, currentWord } = getStore().letters
    if (currentLetterPos > 0) {
      dispatch({ type: REMOVE_LETTER, payload: { 
        letterPosition: currentLetterPos - 1, 
        currentWord: currentWord.slice(0, currentWord.length - 1) 
      }});
    }
  }
}

export const guessWord = () => {
  return (dispatch: any, getStore: GetStore) => {
    const { 
      guessNumber: currentGuessNumber,
      letterPosition: currentLetterPos,
      guessedLetters: currentGuessedLetters,
      guessedWords,
      currentWord
    } = getStore().letters;
    const isLastGuess = currentGuessNumber === 6 && currentLetterPos === 5;

    if (currentWord.length < 5) {
      showToast('Not enough letters');
      return;
    }

    if (!WORDS.includes(currentWord.toLowerCase())) {
      showToast('Not in word list');
      return;
    }



    if (isLastGuess) {
      return;
    }

    if (currentGuessNumber < 6) {
      dispatch({ type: GO_TO_NEXT_ROW, payload: { 
        guessNumber: currentGuessNumber + 1, 
        letterPosition: 0,
        currentWord: ''
      }});

      dispatch({ 
        type: GUESS_WORD, 
        payload: {
          guessedWords: [...guessedWords, currentWord],
          guessedLetters: [...currentGuessedLetters, [...currentWord.split('')]]
        } 
      });
    }
  }
}

const showToast = (text: string) => {
  Toast.show(text, {
    duration: 3250,
    position: 50,
    backgroundColor: '#fff',
    textColor: '#000'
  });
}
