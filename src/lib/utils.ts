import Toast from 'react-native-root-toast';

import {
  WHITE_COLOR,
  BLACK_COLOR,
  COLORBLIND_PRIMARY,
  COLORBLIND_SECONDARY,
  LIGHT_MODE_GREEN,
  LIGHT_MODE_YELLOW,
  GREEN_COLOR,
  DARK_YELLOW,
} from '../colors';

export const showToast = (text: string) => {
  Toast.show(text, {
    duration: 5,
    position: 50,
    backgroundColor: WHITE_COLOR,
    textColor: BLACK_COLOR,
  });
};

export const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];

export const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];

export const thirdRow = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'backspace-outline'];

export const getMainColors = (
  isDarkMode: boolean,
  isColorblindMode: boolean
): { primaryColor: string; secondaryColor: string } => {
  if (isColorblindMode) {
    return { primaryColor: COLORBLIND_PRIMARY, secondaryColor: COLORBLIND_SECONDARY };
  }

  if (isDarkMode) {
    return { primaryColor: GREEN_COLOR, secondaryColor: DARK_YELLOW };
  }

  return { primaryColor: LIGHT_MODE_GREEN, secondaryColor: LIGHT_MODE_YELLOW };
};
