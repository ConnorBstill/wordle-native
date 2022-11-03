import { LETTER_INPUT, ENTER_INPUT } from './types';

export const inputLetter= (letter: string) => {
  console.log('inputLetteraction')
  return (dispatch: any, getStore: any) => {
    console.log(letter, getStore());
  }
}
