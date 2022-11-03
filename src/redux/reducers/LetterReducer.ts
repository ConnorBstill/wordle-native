import { 
  LETTER_INPUT,
  ENTER_INPUT,
  GUESS_WORD
} from '../actions/types';

interface InitialState {
  guessNumber: number;
  letterPosition: number;
  guessedLetters: string[];
  guessedWords: string[]
}


const initialState: InitialState = {
  guessNumber: 1,
  letterPosition: 1,
  guessedLetters: [],
  guessedWords: []
}

export default (state = initialState, action: any) => {
  console.log('REDUCER ONE')
  switch (action.type) {
    case LETTER_INPUT:
      return { ...state, letterPosition: action.payload }
    case ENTER_INPUT:
      return { ...state, guessNumber: action.payload }
    case GUESS_WORD:
      return { ...state, guessedWords: action.payload }
    default:
      console.log('REDUCER')
      return state;
  }
}

