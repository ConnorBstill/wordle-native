import { atom } from 'jotai';

import { WORD_OF_THE_DAY } from './lib/words';

export const correctWordAtom = atom(WORD_OF_THE_DAY.toUpperCase());

export const settingsModalShowingAtom = atom(false);
export const hardModeEnabledAtom = atom(false);
export const darkThemeEnabledAtom = atom(true);
export const highContrastModeEnabledAtom = atom(false);

export const gameIsStartedAtom = atom(false);
export const gameIsOverAtom = atom(false);
export const guessNumberAtom = atom(1);
export const letterPositionAtom = atom(-1);
export const guessedWordsAtom = atom<string[]>([]);
export const currentWordAtom = atom('');
export const enteredLetterAtom = atom('');
