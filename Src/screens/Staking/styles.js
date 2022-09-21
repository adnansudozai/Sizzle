import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    backgroundColor: 'white',
  },
  slide: {
    marginTop: hp(2),
    height: hp(85),
    borderRadius: 10,
    backgroundColor: '#FC4070',
    // backgroundColor: '#000',
  },
  render: {
    height: 100,
    backgroundColor: '#fff',
    marginTop: 10,
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  name: {
    color: '#000',
    fontSize: 5,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  price: {
    color: '#000',
    fontSize: 4,
    marginTop: 5,
    marginLeft: 2,
    fontWeight: 'bold',
  },
  tokenName: {
    color: '#000',
    fontSize: 4,
    marginTop: 5,
    marginLeft: 2,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginLeft: 10,
    marginBottom: 12,
  },
  listImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginLeft: 10,
    alignSelf: 'center',
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
  },
  listViewBullur: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    opacity: 0.2,
  },
  textView: {
    alignSelf: 'center',
    marginLeft: 7,
    fontSize: 4.5,
    width: wp(60),
  },
});

export default styles;
