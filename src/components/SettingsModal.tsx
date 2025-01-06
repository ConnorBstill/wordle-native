import { useContext } from 'react';
import { Modal, Text, View, Switch, StyleSheet } from 'react-native';

import { Icon } from '@rneui/themed';

import { DarkModeContext } from '../DarkModeContext';
import { useAtom, useAtomValue } from 'jotai';

import {
  settingsModalShowingAtom,
  hardModeEnabledAtom,
  highContrastModeEnabledAtom,
  gameIsStartedAtom,
} from '../jotai-store';

import {
  WHITE_COLOR,
  BLACK_COLOR,
  DARK_GRAY,
  GRAY_COLOR,
  GREEN_COLOR,
} from '../colors';

interface ScreenModalProps {
  visible?: boolean;
}

const SettingsModal = (props: ScreenModalProps) => {
  const [settingsModalShowing, setSettingsModalShowing] = useAtom(
    settingsModalShowingAtom
  );

  const gameIsStarted = useAtomValue(gameIsStartedAtom);

  const { darkTheme, setDarkTheme } = useContext(DarkModeContext);
  const [hardModeEnabled, setHardModeEnabled] = useAtom(hardModeEnabledAtom);
  const [highContrastModeEnabled, setHighContrastModeEnabled] = useAtom(
    highContrastModeEnabledAtom
  );

  const {
    innerContainerStyles,
    modalViewStyle,
    headerTextStyle,
    headerContainerStyle,
    closeIconStyle,
    settingsSectionHeaderStyle,
    settingsSectionSubtextStyle,
    settingsSwitchStyle,
    settingsSectionContainerStyle,
  } = styles;

  const closeSettingsModal = () => {
    setSettingsModalShowing(false);
  };

  const toggleHardMode = () => {
    setHardModeEnabled((prevVal) => !prevVal);
  };

  const toggleDarkTheme = (value: boolean) => {
    setDarkTheme(value ? 'on' : 'off');
  };

  const toggleHighContrastMode = () => {
    setHighContrastModeEnabled((prevVal) => !prevVal);
  };

  return (
    <Modal
      visible={settingsModalShowing}
      animationType="slide"
      // backdropColor is in the docs but doesn't actually exist :)) https://reactnative.dev/docs/modal#backdropcolor
      // backdropColor='rgba(0, 0, 0, 0.5)'
      transparent={true}
    >
      <View style={innerContainerStyles}>
        <View style={modalViewStyle}>
          <View style={headerContainerStyle}>
            <View style={{ width: 20 }}></View>

            <Text style={headerTextStyle}>SETTINGS</Text>

            <Icon
              onPress={closeSettingsModal}
              style={closeIconStyle}
              name="close"
              type="material"
              color={WHITE_COLOR}
            />
          </View>

          <View style={settingsSectionContainerStyle}>
            <View>
              <Text style={settingsSectionHeaderStyle}>Hard Mode</Text>
              <Text style={settingsSectionSubtextStyle}>
                Any revealed hints must be used in subsequent guesses
              </Text>
            </View>

            <Switch
              value={hardModeEnabled}
              onChange={toggleHardMode}
              disabled={gameIsStarted}
              style={settingsSwitchStyle}
              thumbColor={WHITE_COLOR}
              trackColor={{ false: DARK_GRAY, true: GREEN_COLOR }}
            />
          </View>

          <View style={settingsSectionContainerStyle}>
            <View>
              <Text style={settingsSectionHeaderStyle}>Dark Theme</Text>
            </View>

            <Switch
              value={darkTheme === 'on' ? true : false}
              onValueChange={toggleDarkTheme}
              style={settingsSwitchStyle}
              thumbColor={WHITE_COLOR}
              trackColor={{ false: DARK_GRAY, true: GREEN_COLOR }}
            />
          </View>

          <View style={settingsSectionContainerStyle}>
            <View>
              <Text style={settingsSectionHeaderStyle}>High Contrast Mode</Text>
              <Text style={settingsSectionSubtextStyle}>
                Contrast and colorblindness improvements
              </Text>
            </View>

            <Switch
              value={highContrastModeEnabled}
              onChange={toggleHighContrastMode}
              style={settingsSwitchStyle}
              thumbColor={WHITE_COLOR}
              trackColor={{ false: DARK_GRAY, true: GREEN_COLOR }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  innerContainerStyles: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalViewStyle: {
    backgroundColor: BLACK_COLOR,
    borderWidth: 0.5,
    borderColor: DARK_GRAY,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    height: '67%',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
  },
  headerTextStyle: {
    color: WHITE_COLOR,
    height: '100%',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeIconStyle: {
    height: '100%',
    width: 20,
  },
  settingsSectionContainerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: DARK_GRAY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 5,
    paddingBottom: 15,
    marginBottom: 15,
  },
  settingsSectionHeaderStyle: {
    color: WHITE_COLOR,
    fontSize: 17,
  },
  settingsSectionSubtextStyle: {
    color: WHITE_COLOR,
    fontSize: 10.5,
  },
  settingsSwitchStyle: {
    transform: [{ scaleX: 0.65 }, { scaleY: 0.65 }],
  },
});

export default SettingsModal;
