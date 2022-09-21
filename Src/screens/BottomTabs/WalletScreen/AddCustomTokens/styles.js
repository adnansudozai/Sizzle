import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Color from '../../../../themes/colors';

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    // paddingVertical: 10,
    marginTop: hp(1),
    backgroundColor: Color.backgroundColor,
    borderWidth:0,
    marginHorizontal:10
  },
  mainview: {},
  headingtext: {
    fontSize: 6,
    fontWeight: '400',
    color: Color.balckText,
  },
  errortext: {
    fontSize: 5,
    marginTop: 10,
    paddingHorizontal: 3,
  },
  hadingview: {
    marginTop: hp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hp(1.5),
    borderWidth:0
  },
  inputstyleFirst: {
 
    paddingVertical: 17,
    paddingHorizontal: 5,
    borderWidth: 1.5,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    color: Color.balckText,
    paddingLeft: 10,
  },
  inputstyle: {
    marginTop: hp(5),
    paddingVertical: 17,
    paddingHorizontal: 5,
    borderWidth: 1.5,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    color: Color.balckText,
    paddingLeft: 10,
  },
  inptview: {
    borderWidth: 0,
    marginTop: hp(3),
    marginHorizontal: wp(4.1),
  },
  tabmainview: {
    borderWidth: 0,
    marginTop: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(2),
  },
  //drop down styling
  dropdownview: {
    marginTop: hp(3),
    flexDirection: 'row',
    // marginHorizontal: wp(3.3),
    borderWidth: 0,
    alignItems: 'center',
  },
  dropDown_textStyle: {
    paddingLeft: 5,
    fontFamily: 'Goldman-Regular',
    fontSize: 16,
    color: '#C8C8C8',
  },
  defaultdropdowntext: {
    paddingLeft: 5,
    fontFamily: 'Goldman-Regular',
    fontSize: 16,
    color: '#C8C8C8',
  },
  dropDown: {
    paddingVertical: 17,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  dropDownNetwork: {
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    marginTop: wp(6),
  },
  dropDown_dropDownStyle: {
    width: wp(80),
    marginLeft: wp(-12),
    borderRadius: 12,
    marginTop: wp(7),
    borderWidth: 0,
    height: wp(20),
  },
  dropDown_dropDownStyleNetwork: {
    width: wp(80),
  },
  //end drop down style

  maininputview: {
    borderWidth: 0,
    // paddingHorizontal: wp(6),
    alignSelf: 'center',
    width: wp(88),
  },
  nametext: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',

    marginRight: 5,
  },
  dropdownstyle: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    height: hp(8),
  },
  dropdown: {
    borderColor: '#E2E2E2',
    flexDirection: 'row',
    marginHorizontal: wp(7),
    alignItems: 'flex-start',
    borderRadius: 10,
    justifyContent: 'flex-start',
  },
  tabview: {
    borderBottomWidth: 2,
    borderColor: Color.tabviewbordercolor,
    width: wp(40),
  },
  tabviewtext: {
    fontSize: 16,
    // fontWeight: '400',
    paddingBottom: 10,
    color: Color.balckText,
  },

  touchmain: {
    borderWidth: 0,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  touchmainView: {
    borderWidth: 0,
    marginHorizontal: wp(7),
    flexDirection: 'row',
    marginTop: hp(6),
  },
  viewimg: {
    alignSelf: 'center',
    
  },
  textmain: {
    width: wp(73),
    alignItems: 'center',
    borderWidth:0
  },
  netWork: {
    width: wp(73),
    alignItems: 'center',
    // bottom:20
  },

  leftarrow: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  txtview: {
    width: wp(70),
    alignItems: 'center',

  },
  txt: {
    fontSize: 4,
    color: '#FF0083',
  },
  dangerview: {
    borderColor: 'red',
    borderWidth:0,
    justifyContent: 'center',
    backgroundColor: '#FFEBF0',
    borderRadius: 10,
    marginHorizontal: wp(6.5),
    padding: 20,
    marginTop: Platform.OS == 'ios' ? hp(10) : hp(5),
  },
  dangerviewmain: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dangerviewsub: {
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
    marginHorizontal: hp(1),
  },
  dangerimg: {
    height: 30,
    width: 30,
  },
  downarrow: {
    height: 14,
    width: 16,
    alignSelf: 'center',
  },
  viewtxt: {
    color: '#000000',
    fontSize: 20,
    lineHeight: 26,
    alignSelf:"center"
    // fontWeight: '500',
  },
});

export default styles;
