import Toast from 'react-native-root-toast';

import { WHITE_COLOR, BLACK_COLOR } from '../colors';

export const showToast = (text: string) => {
  Toast.show(text, {
    duration: 3250,
    position: 50,
    backgroundColor: WHITE_COLOR,
    textColor: BLACK_COLOR,
  });
};

export const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];

export const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];

export const thirdRow = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'backspace-outline'];