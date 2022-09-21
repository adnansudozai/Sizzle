import React, {useState, useImperativeHandle} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BottomPopup = ({children, PopupHeight}, ref) => {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => setVisible(true),
        close: () => setVisible(false),
      };
    },
    [],
  );
  return (
    <Modal
      animationInTiming={400}
      animationOutTiming={500}
      backdropTransitionOutTiming={0}
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
        marginBottom: 49,
      }}
      customBackdrop={
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{
            flex: 1,
            marginBottom: 49,
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          activeOpacity={1}
        />
      }>
      <View
        style={{
          backgroundColor: '#fff',
          height: hp(PopupHeight),
          justifyContent: 'center',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 35,
        }}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default React.forwardRef(BottomPopup);
