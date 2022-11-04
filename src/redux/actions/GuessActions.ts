import { 
  INPUT_LETTER, 
  CHANGE_FOCUSED_INPUT, 
  GUESS_WORD, 
  GO_TO_NEXT_ROW,
} from './types';
import { State } from '../reducers/LetterReducer';
import { current } from '@reduxjs/toolkit';

interface GetStore {
  (): { letters: State }
}

export const inputLetter = (letter: string) => {
  return (dispatch: any, getStore: GetStore) => {
    const { letterPosition: currentLetterPos, currentWord } = getStore().letters;

    if (currentLetterPos < 5) {
      const newLetterPosition = getStore().letters.letterPosition + 1;
      const newWord = currentWord + letter;

      dispatch({ type: CHANGE_FOCUSED_INPUT, payload: newLetterPosition });
      dispatch({ type: INPUT_LETTER, payload: newWord });
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

    if(currentLetterPos === 5) {
      if (currentGuessNumber === 6) {
        // End game
      } else if (currentGuessNumber < 6) {
        dispatch({ type: GO_TO_NEXT_ROW, payload: currentGuessNumber + 1 });
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
}
