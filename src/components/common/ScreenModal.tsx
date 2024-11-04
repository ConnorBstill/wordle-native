import { Modal, Text, View, StyleSheet } from 'react-native';

const ScreenModal = (props: { visible: boolean }) => {
  return (
    <Modal visible={props.visible} transparent={true}>
      <View style={styles.innerContainerStyles}>
        <Text>MODALLL</Text>
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '50%',
  },
});

export default ScreenModal;
