import { combineReducers } from 'redux';

import LetterReducer from './LetterReducer';

export default function getRootReducer() {
  return combineReducers({
    letters: LetterReducer,
  });
}
