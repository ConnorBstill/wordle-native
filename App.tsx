// import { StatusBar } from 'expo-status-bar';
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
    guessesContainer,
    keyBoardContainer
  } = styles;

  return (
    <SafeAreaView style={container}>
      <View style={fullContainer}>
        <StatusBar barStyle='light-content' />
        <Toolbar />

        <View style ={contentContainer}>
          <View style={guessesContainer}>
            <WordGuesses />
          </View>

          <View style={keyBoardContainer}>
            <KeyboardSection />
          </View>
        </View>
      </View>
    </SafeAreaView>
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
  },
  keyBoardContainer: {
    // backgroundColor: 'red'
  }
});
