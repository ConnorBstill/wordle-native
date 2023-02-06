import {
  INPUT_LETTER,
  ENTER_INPUT,
  GUESS_WORD,
  CHANGE_FOCUSED_INPUT,
  REMOVE_LETTER,
  GO_TO_NEXT_ROW,
} from '../actions/types';

import { WORD_OF_THE_DAY } from '../../constants/words';

export interface State {
  guessNumber: number;
  letterPosition: number;
  guessedLetters: string[];
  guessedWords: string[];
  currentWord: string;
  enteredLetter: string;
  correctWord: string;
}

const initialState: State = {
  guessNumber: 1,
  letterPosition: 0,
  guessedLetters: [],
  guessedWords: [],
  currentWord: '',
  enteredLetter: '',
  correctWord: WORD_OF_THE_DAY.toUpperCase(),
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_FOCUSED_INPUT:
      return { ...state, letterPosition: action.payload };
    case ENTER_INPUT:
      return { ...state, guessNumber: action.payload };
    case GUESS_WORD:
      return {
        ...state,
        guessedWords: action.payload.guessedWords,
        guessedLetters: action.payload.guessedLetters,
      };
    case GO_TO_NEXT_ROW:
      return {
        ...state,
        guessNumber: action.payload.guessNumber,
        letterPosition: action.payload.letterPosition,
        currentWord: action.payload.currentWord,
      };
    case INPUT_LETTER:
      return {
        ...state,
        currentWord: action.payload.newWord,
        enteredLetter: action.payload.letter,
      };
    case REMOVE_LETTER:
      return {
        ...state,
        letterPosition: action.payload.letterPosition,
        currentWord: action.payload.currentWord,
      };
    default:
      return state;
  }
};
