import { createContext } from 'react';

export const DarkModeContext = createContext({
  darkTheme: 'on',
  setDarkTheme: (theme: string) => {}
});
