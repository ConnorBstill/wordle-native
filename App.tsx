// import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar, StatusBarStyle } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { Provider as JotaiProvider } from 'jotai';

import Toolbar from './src/components/Toolbar';
import WordRow from './src/components/WordRow';
import KeyboardSection from './src/components/KeyboardSection';
import SettingsModal from './src/components/SettingsModal';

import { DarkModeContext } from './src/providers/DarkModeContext';
import { ColorblindModeContext } from './src/providers/ColorBlindModeContext';

import { BLACK_COLOR, WHITE_COLOR } from './src/colors';

export default function App() {
  const [isDarkTheme, setDarkTheme] = useState(true);
  const darkModeProviderValue = { isDarkTheme, setDarkTheme }

  const [isColorblindMode, setColorblindMode] = useState(false);
  const colorblindModeProviderValue = { isColorblindMode, setColorblindMode }

  const darkThemeConfigs = {
    pageBackgroundColor: {
      backgroundColor: isDarkTheme ? BLACK_COLOR : WHITE_COLOR
    },
    toolbarStyle: isDarkTheme ? 'light-content' : 'dark-content'
  }

  const { 
    container, 
    fullContainer, 
    contentContainer,
    guessesContainer
  } = styles;

  const [fontsLoaded] = useFonts({
    'Helvetica': require('./assets/fonts/Helvetica-Neue-W01-66-Medium-It.ttf'),
    'Karnak': require('./assets/fonts/karnak-normal-400.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <JotaiProvider>
        <ColorblindModeContext.Provider value={colorblindModeProviderValue}>
          <DarkModeContext.Provider value={darkModeProviderValue}>
            <SafeAreaView style={[container, darkThemeConfigs.pageBackgroundColor]} onLayout={onLayoutRootView}>
              <View style={fullContainer}>
                <StatusBar barStyle={darkThemeConfigs.toolbarStyle as StatusBarStyle} />
                <Toolbar />

                <View style ={contentContainer}>
                  <View style={guessesContainer}>
                    <WordRow row={1} />
                    <WordRow row={2} />
                    <WordRow row={3} />
                    <WordRow row={4} />
                    <WordRow row={5} />
                    <WordRow row={6} />
                  </View>

                  <View>
                    <KeyboardSection />
                  </View>
                </View>
              </View>

              <SettingsModal />
            </SafeAreaView>
          </DarkModeContext.Provider>
        </ColorblindModeContext.Provider>
      </JotaiProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullContainer: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentContainer: {
    flex: 1,
    marginTop: 30,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  guessesContainer: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  }
});
