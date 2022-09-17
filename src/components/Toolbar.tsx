import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import * as COLORS from '../colors';


const Toolbar = (props: any) => {


  return (
    <View style={styles.containerStyle}>
      <View>
        <Text style={styles.titleStyle}>Wordle</Text>
      </View>

      <View>
        <Text>Icons here</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // backgroundColor: COLORS.
  containerStyle: {
    width: '100%',
    height: 50,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    borderBottomColor: '#3a3a3c',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 15
  },
  titleStyle: {
    color: COLORS.WHITE,
    fontSize: 28
  }
});

export default Toolbar; 
