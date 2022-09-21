import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Color from '../../../../themes/colors';

const VerifySecretStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
  },

  TextView: {
    marginVertical: 10,
    alignSelf: 'center',
    // marginHorizontal: wp(10),
  },
  TextH1: {
    fontSize: 5.4,
    fontWeight: '400',
    color: '#000',
  },
  TextPlaceholderCenter: {
    fontSize: 4,
    fontWeight: '400',
    marginHorizontal: wp(5),
    color: '#8A8A8A',
    textAlign: 'center',
  },
  TextPlaceholder: {
    fontSize: 3.5,
    fontWeight: '600',
    color: '#939393',
    paddingLeft: 5,
  },

  ButtonContainer: {
    marginTop: hp(12),
  },
  TopContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  MiddleContainer: {
    flex: 0.5,
    borderColor: 'red',
  },

  BottomContaner: {
    flex: 0.2,
    borderColor: 'red',
  },

  itemContainer: {
    backgroundColor: '#F1F1F5',
    borderRadius: 10,
    width: wp(20),
    height: wp(10),
    borderColor: '#DEE3F0',
    borderWidth: 1,
    marginLeft: 7,
    marginTop: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemContainerUpper: {
    backgroundColor: '#F1F1F5',
    borderRadius: 10,
    width: wp(19),
    height: wp(10),
    borderColor: '#DEE3F0',
    borderWidth: 1,
    marginLeft: 7,
    marginTop: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  copyButton: {
    marginTop: wp(15),
    alignSelf: 'center',
    borderColor: '#3467C0',
    borderWidth: 2,
    width: wp(30),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  copyText: {
    fontSize: 4,
    lineHeight: 16,
    fontWeight: '700',

    color: '#3467C0',
  },
  selectedContainer: {
    marginHorizontal: wp(5),
    height: wp(45),
    borderColor: 'red',
    backgroundColor: '#F1F1F5',
    marginHorizontal: wp(3),
    marginBottom: 20,
    borderRadius: 15,
  },
  WarningTextGreen: {
    fontSize: 4,
    fontWeight: '500',

    color: 'green',
    textAlign: 'center',
  },
});

export default VerifySecretStyles;
