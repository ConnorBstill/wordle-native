import { atom } from 'jotai';

import { WORDS } from './lib/words';

const WORD_OF_THE_DAY = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
console.log('WORD_OF_THE_DAY', WORD_OF_THE_DAY);

export const settingsModalShowingAtom = atom(false);
export const hardModeEnabledAtom = atom(false);

export const correctWordAtom = atom(WORD_OF_THE_DAY);
export const gameIsStartedAtom = atom(false);
export const gameIsOverAtom = atom(false);
export const guessNumberAtom = atom(1);
export const letterPositionAtom = atom(-1);
export const guessedWordsAtom = atom<string[]>([]);
export const currentWordAtom = atom('');
export const enteredLetterAtom = atom('');
