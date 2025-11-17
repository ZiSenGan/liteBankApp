import { ActivityIndicator, Modal, View, StyleSheet } from 'react-native';
import React from 'react';

let setVisible: (v: boolean) => void;

export const Loading = () => {
  const [visible, _setVisible] = React.useState(false);
  setVisible = _setVisible;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    </Modal>
  );
};

// Call these anywhere
export const showLoading = () => setVisible(true);
export const hideLoading = () => setVisible(false);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 12,
  },
});
