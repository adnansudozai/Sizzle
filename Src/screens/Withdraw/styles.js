import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  inputView: {
    top: hp(2),
    width: '90%',
    alignSelf: 'center',
  },
  inputLabel: {
    fontWeight: 'bold',
    color: '#1F1F1F',
  },
  dataLabel: {
    fontWeight: 'bold',
    color: '#929292',
  },
  withdrawInfoBanner: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#EAF2FF',
    color: '#3A5D9A',
    padding: wp(4),
    borderRadius: 15,
    marginTop: hp(5),
  },
  cancel: {
    alignSelf: 'center',
    marginTop: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  cancelText: {
    fontWeight: 'bold',
    color: '#000',
  },
  listImage: {
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 20,
  },
  symbolTxt: {
    color: '#222',
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
  displayDataView: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#F1F1F5',
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default styles;
