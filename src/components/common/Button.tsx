import { useContext } from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from 'react-native';

import { DarkModeContext } from '../../providers/DarkModeContext';

import { 
  GREEN_COLOR, 
  LIGHT_MODE_GREEN, 
  DARK_YELLOW, 
  LIGHT_MODE_YELLOW,
  WHITE_COLOR
} from '../../colors';

interface AppButtonProps extends TouchableOpacityProps {
  type: 'primary' | 'secondary'
}

const Button = ({ onPress, children, type, style }: AppButtonProps) => {
  const { darkTheme } = useContext(DarkModeContext);

  const isDarkTheme = darkTheme === 'on';

  const themeColorsConfig = {
    primaryBackgroundColor: isDarkTheme ? GREEN_COLOR : LIGHT_MODE_GREEN,
    secondaryBackgroundColor: isDarkTheme ? DARK_YELLOW : LIGHT_MODE_YELLOW
  }

  const { primaryBackgroundColor, secondaryBackgroundColor } = themeColorsConfig;
  const { containerStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        containerStyle,
        { 
          backgroundColor: type === 'primary' ?  primaryBackgroundColor : secondaryBackgroundColor
        },
        style
      ]}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  )
}

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

  }
});

export { Button }
