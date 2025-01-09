import { useContext } from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from 'react-native';

import { DarkModeContext } from '../../providers/DarkModeContext';
import { ColorblindModeContext } from '../../providers/ColorBlindModeContext';

import {
  GREEN_COLOR,
  LIGHT_MODE_GREEN,
  DARK_YELLOW,
  LIGHT_MODE_YELLOW,
  WHITE_COLOR,
} from '../../colors';

import { getMainColors } from '../../lib/utils';

interface AppButtonProps extends TouchableOpacityProps {
  type: 'primary' | 'secondary';
}

const Button = ({ onPress, children, type, style }: AppButtonProps) => {
  const { darkTheme } = useContext(DarkModeContext);
  const { isColorblindMode } = useContext(ColorblindModeContext);

  const isDarkTheme = darkTheme === 'on';

  const themeColorsConfig = {
    primaryBackgroundColor: getMainColors(isDarkTheme, isColorblindMode).primaryColor,
    secondaryBackgroundColor: getMainColors(isDarkTheme, isColorblindMode).secondaryColor,
  };

  const { primaryBackgroundColor, secondaryBackgroundColor } = themeColorsConfig;
  const { containerStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        containerStyle,
        {
          backgroundColor:
            type === 'primary' ? primaryBackgroundColor : secondaryBackgroundColor,
        },
        style,
      ]}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    width: '50%',
    height: 44,
  },
  textStyle: {
    color: WHITE_COLOR,
  },
});

export { Button };
