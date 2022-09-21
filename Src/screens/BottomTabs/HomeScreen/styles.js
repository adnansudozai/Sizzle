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
  headerView: {
    marginTop: hp(1),
    height: hp(10),
    paddingHorizontal: wp(5),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promotionCard: {},
  slide: {
    width: wp(100),
    height: hp(15),
  },
  cardView: {
    width: wp(90),
    height: hp(25),
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#FC4070',
  },
  radixIcon: {
    width: wp(15),
    height: wp(15),
    marginLeft: 20,
  },
  imageView: {
    marginTop: hp(3),
    paddingHorizontal: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageStyle: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  textStyle: {
    color: '#000',
    alignSelf: 'center',
    fontSize: 3.2,
  },
  sizzleText: {
    alignSelf: 'center',
    fontSize: 6,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  totalBalnce: {
    color: 'gray',
    marginLeft: 26,
    fontSize: 4.5,
    marginTop: 10,
  },
  sizzelbalnce: {
    color: 'white',
    marginLeft: 26,
    fontSize: 5.5,
    marginTop: 10,
  },
  transactionView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  depositView: {
    color: '#fff',
    fontSize: 3.3,
    fontWeight: '600',
    marginLeft: 2,
  },
  topImage: {
    width: '90%',
    resizeMode: 'cover',
    borderRadius: 10,
    height: 100,
  },
  playToEarn: {
    marginTop: hp(1),
    width: wp(90),
    height: hp(15),
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default styles;
