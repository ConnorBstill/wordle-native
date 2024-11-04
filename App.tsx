// import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Store } from './src/redux/Store';

import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';
import Toolbar from './src/components/Toolbar';
import WordGuesses from './src/components/WordGuesses';
import KeyboardSection from './src/components/KeyboardSection';

import * as COLORS from './src/colors';

export default function App() {
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
      <Provider store={Store}>
        <SafeAreaView style={container} onLayout={onLayoutRootView}>
          <View style={fullContainer}>
            <StatusBar barStyle='light-content' />
            <Toolbar />

            <View style ={contentContainer}>
              <View style={guessesContainer}>
                <WordGuesses />
              </View>

              <View>
                <KeyboardSection />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Provider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
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
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  guessesContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  }
});
