import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    backgroundColor: 'white',
    // backgroundColor: 'red',
  },
  secratePharase: {
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
  },
  TextH1: {
    fontSize: 5.4,
    fontWeight: '400',
    color: '#000',
  },
  TextPlaceholderCenter: {
    fontSize: 4,
    fontWeight: '400',
    color: '#8A8A8A',
    textAlign: 'center',
  },
  TextPlaceholder: {
    fontSize: 3.3,
    fontWeight: '600',
    color: '#939393',
    paddingLeft: 5,
  },
  TopContainer: {
    flex: 0.2,
    borderColor: 'red',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },

  MiddleContainer: {
    flex: 0.4,
    borderColor: 'red',
  },

  BottomContaner: {
    // flex: 0.4,
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
  copyButton: {
    marginTop: wp(12),
    alignSelf: 'center',
    borderColor: '#FC4070',
    borderWidth: 1,
    width: wp(30),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  copyText: {
    fontSize: 4,
    color: '#000',
  },

  WarningText: {
    fontSize: 4,
    fontWeight: '400',
    color: '#FF3465',
  },

  warningSubText: {
    marginTop: 10,
    fontSize: 4,
    fontWeight: '400',
    color: '#FF3465',
    marginHorizontal: 35,
    textAlign: 'center',
  },
  warningContainer: {
    marginVertical: 15,
    backgroundColor: '#FFEBF0',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyWords: {
    // marginVertical: 10,
    alignSelf: 'center',
    marginHorizontal: wp(10),
  },
});
export default styles;
