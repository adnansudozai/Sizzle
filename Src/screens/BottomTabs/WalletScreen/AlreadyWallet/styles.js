import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    marginHorizontal: wp(7),
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    paddingVertical: 10,
    paddingBottom: 15,
    marginTop: hp(8),
  },
  containerchain: {
    marginHorizontal: wp(7),
    borderWidth: 0,
    paddingVertical: 10,
    marginTop: hp(3),
  },
  containerchain2: {
    marginHorizontal: wp(7),
    borderWidth: 0,
    paddingVertical: 10,
  },
  cointermainview: {
    borderWidth: 0,
    borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containersubview: {
    flexDirection: 'row',
    marginTop: hp(0.5),

    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgstyle: {
    height: 40,
    width: 40,
  },
  cview: {
    justifyContent: 'center',
    borderWidth: 0,

    borderColor: 'red',
  },
  cviewtxt: {
    color: 'black',
    fontWeight: '700',
    fontSize: 4.5,
    marginLeft: wp(4),
  },
  cviewtxt1: {
    color: '#B6B6B6',
    fontWeight: '400',
    fontSize: 3,
    marginLeft: wp(4),
  },
  cviewtxtname: {
    color: '#222222',
    fontWeight: '600',
    fontSize: 4,
    marginLeft: wp(4),
  },
  cviewtxttoo: {
    color: '#B6B6B6',
    fontWeight: '400',
    fontSize: 4.5,
    lineHeight: 19.6,
    height: 20,
  },
  touch: {
    marginLeft: hp(1),
    justifyContent: 'center',

    borderColor: 'red',
    borderWidth: 0,
  },
  touchimg: {
    height: 24,
    width: 24,
    alignSelf: 'flex-end',
  },
});
export default styles;
