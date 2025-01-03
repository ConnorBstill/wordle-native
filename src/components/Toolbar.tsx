import { View, Text, StyleSheet } from 'react-native';

import { DARK_GRAY, WHITE_COLOR } from '../colors';

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
    borderBottomColor: DARK_GRAY,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 15,
  },
  titleStyle: {
    color: WHITE_COLOR,
    fontSize: 28,
    fontFamily: 'Karnak',
  },
});

export default Toolbar;
