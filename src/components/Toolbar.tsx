import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

import { useSetAtom } from 'jotai';

import { settingsModalShowingAtom } from '../jotai-store';

import { DARK_GRAY, WHITE_COLOR } from '../colors';

const Toolbar = () => {
  const setSettingsModalShowing = useSetAtom(settingsModalShowingAtom);

  const { containerStyle, titleContainerStyle, titleStyle } = styles;

  const showSettingsModal = () => {
    console.log('icon pressed');
    setSettingsModalShowing(true);
  };

  return (
    <View style={containerStyle}>
      <View style={titleContainerStyle}>
        <Text style={titleStyle}>Wordle</Text>
      </View>

      <Icon
        onPress={showSettingsModal}
        name="settings"
        type="material"
        color={WHITE_COLOR}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: 50,
    borderBottomColor: DARK_GRAY,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  titleContainerStyle: {},
  titleStyle: {
    color: WHITE_COLOR,
    fontSize: 28,
    fontFamily: 'Karnak',
  },
});

export default Toolbar;
