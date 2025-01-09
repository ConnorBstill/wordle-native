import { createContext } from 'react';

export const DarkModeContext = createContext({
  isDarkTheme: true,
  setDarkTheme: (theme: boolean) => {},
});
