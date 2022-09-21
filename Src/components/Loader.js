import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;


  return (
    <Modal
    transparent={true}
    animationType='fade'
    visible={loading}
    onRequestClose={() => {}}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
      <ActivityIndicator size="large" color="#FF0083" />
      </View>
    </View>
  </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor:'transparent'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'transparent',
    height: 120,
    width: 120,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  
  lottieStyle:{
    width:70,
    height:70,


  
  }
});

export default Loader;