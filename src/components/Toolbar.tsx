import { View, Text, StyleSheet } from 'react-native';

import * as COLORS from '../colors';

const Toolbar = () => {
  return (
    <View style={styles.containerStyle}>
      <View>
        <Text style={styles.titleStyle}>Wordle</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: 50,
    borderBottomColor: '#3a3a3c',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 15,
  },
  titleStyle: {
    color: COLORS.WHITE,
    fontSize: 28,
    fontFamily: 'Karnak',
  },
});

export default Toolbar;
