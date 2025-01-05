import { atom } from 'jotai';

import { WORD_OF_THE_DAY } from './lib/words';

export const correctWordAtom = atom(WORD_OF_THE_DAY.toUpperCase());

export const guessNumberAtom = atom(1);
export const letterPositionAtom = atom(-1);
export const guessedWordsAtom = atom<string[]>([]);
export const currentWordAtom = atom('');
export const enteredLetterAtom = atom('');
