// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';

import Toolbar from './src/components/Toolbar';
import WordGuesses from './src/components/WordGuesses';
import KeyboardSection from './src/components/KeyboardSection';

import * as COLORS from './src/colors';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fullContainer}>
        <StatusBar barStyle='light-content' />
        <Toolbar />

        <View style ={styles.contentContainer}>
          <WordGuesses />

          <KeyboardSection />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  fullContainer: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  }
});
