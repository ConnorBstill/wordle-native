// import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { Store } from './src/redux/Store';
import { Provider as JotaiProvider, atom } from 'jotai';

import Toolbar from './src/components/Toolbar';
import WordRow from './src/components/WordRow';
import KeyboardSection from './src/components/KeyboardSection';

import { BLACK_COLOR } from './src/colors';
import { WORD_OF_THE_DAY } from './src/lib/words';

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
        <JotaiProvider>
          <SafeAreaView style={container} onLayout={onLayoutRootView}>
            <View style={fullContainer}>
              <StatusBar barStyle='light-content' />
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
          </SafeAreaView>
        </JotaiProvider>
      </Provider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK_COLOR,
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
    // backgroundColor: 'red',
    alignContent: 'center',
    justifyContent: 'center',
  }
});
