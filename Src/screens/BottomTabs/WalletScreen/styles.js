import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  walletView: {
    flexDirection: 'row',
    marginTop: hp(5),
    marginLeft: wp(4),
  },
  balanceView: {
    marginTop: 20,
    marginLeft: 10,
  },
  currentBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dallorsBalance: {
    color: '#000',
    fontSize: 6,
    fontWeight: '600',
  },
  listView: {

    backgroundColor: '#FC4070',
    height: 100,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  listImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignSelf: 'center',
    marginLeft: 10,
  },
  walletText: {
    color: '#000',
    marginRight: 10,
  },
  listStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyName: {
    color: '#fff',
    fontSize: 4.5,
    marginLeft: 10,
  },
  totalValue: {
    alignSelf: 'center',
    paddingRight: 20,
    color: '#fff',
  },
});

export default styles;
