import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../../../themes/colors';

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: Color.backgroundColor,
  },
  touchmain: {
    justifyContent: 'space-evenly',
    marginHorizontal: wp(8),
    flexDirection: 'row',
    marginTop: hp(6),
    borderWidth: 0,
  },

  viewimg: {
    alignSelf: 'center',
  },
  leftarrow: {
    height: 24,
    width: 24,
    alignSelf: 'center',
  },
  viewtxt: {
    color: 'black',
    fontSize: 6,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0.02,
    position: 'absolute',
  },
  textmain: {
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 0,
    width: wp(80),
    justifyContent: 'center',
    alignItems: 'center',

  },
  mainnotifications: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    padding: wp(5),
  },
  mainview: {
    borderWidth: 0,
    flexDirection: 'row',

    alignItems: 'center',
  },
  headingview: {
    borderWidth: 0,
    marginLeft: 10,
    width:wp(50)
  },
  dateview: {
    borderWidth: 0,
    marginLeft: 10,
    width:wp(28),
    alignItems:'flex-end'
   
  },
  explanationtext: {
    fontSize: 4,
    fontWeight: '400',
    
    // marginTop: 3,
    letterSpacing: 0.02,
    color: Color.grayText,
  },
  headingtext: {
    fontSize: 4.5,
    fontWeight: '500',
    letterSpacing: 0.02,
    color: Color.balckText,
    width: wp(55),
    borderWidth: 0,
    marginTop:5
  },
});

export default styles;
