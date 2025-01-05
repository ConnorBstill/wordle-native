import { Modal, Text, View, StyleSheet } from 'react-native';

import { WHITE_COLOR } from '../../colors';

const ScreenModal = (props: { visible: boolean }) => {
  return (
    <Modal visible={props.visible} transparent={true}>
      <View style={styles.innerContainerStyles}>
        <Text>MODAL</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  outerContainerStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  innerContainerStyles: {
    backgroundColor: WHITE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '50%',
  },
});

export default ScreenModal;
