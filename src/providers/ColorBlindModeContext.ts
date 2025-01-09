import { createContext } from 'react';

export const ColorblindModeContext = createContext({
  isColorblindMode: false,
  setColorblindMode: (theme: boolean) => {},
});
