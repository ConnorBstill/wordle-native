import { 
  INPUT_LETTER,
  ENTER_INPUT,
  GUESS_WORD,
  CHANGE_FOCUSED_INPUT
} from '../actions/types';

export interface State {
  guessNumber: number;
  letterPosition: number;
  guessedLetters: string[];
  guessedWords: string[];
  currentWord: string;
}


const initialState: State = {
  guessNumber: 1,
  letterPosition: 0,
  guessedLetters: [],
  guessedWords: [],
  currentWord: ''
}

export default (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_FOCUSED_INPUT:
      return { ...state, letterPosition: action.payload }
    case ENTER_INPUT:
      return { ...state, guessNumber: action.payload }
    case GUESS_WORD:
      return { ...state, guessedWords: action.payload.guessedWords, guessedLetters: state.guessedLetters }
    case INPUT_LETTER:
      return { ...state, currentWord: action.payload }
    default:
      return state;
  }
}

