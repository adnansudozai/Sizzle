import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropShadow from 'react-native-drop-shadow';
import ResponsiveText from './ResponsiveText';
import Colors from '../themes/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

function GradientButton({
  btnContainer,
  titleStyle,
  onPress,
  title,
  loading,
  gradientColor,
  shadowColor,
}) {
  return (
    <TouchableOpacity activeOpacity={5} onPress={() => onPress()}>
      {loading ? (
        <ActivityIndicator size="large" color="#fafafa" />
      ) : (
        <DropShadow
          style={{
            shadowColor: shadowColor ? shadowColor : '#FFFFFF',
            shadowOffset: {
              width: 10,
              height: 15,
            },
            shadowOpacity: 0.9,
            shadowRadius: 10,
          }}>
          <LinearGradient
            colors={
              gradientColor
                ? gradientColor
                : [Colors.BtnBackground, Colors.BtnBackground]
            }
            style={[
              styles.btn,
              {
                height: wp('16%'),
                elevation: 20,
              },
              btnContainer ? btnContainer : {},
            ]}>
            <ResponsiveText style={{...styles.title, ...titleStyle}}>
              {title}
            </ResponsiveText>
          </LinearGradient>
        </DropShadow>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.BtnBackground,
    width: wp('100%') - 40,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: wp('3.5%'),
    borderRadius: wp('2%'),
    marginBottom: 8,
  },
  title: {
    alignSelf: 'center',
    color: Colors.BtnText,
    fontSize: 5,
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
  },
});
export default GradientButton;
