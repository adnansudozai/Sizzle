import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../../themes/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerProfile: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    borderWidth: 2,
    borderRadius: 45 / 2,
    borderColor: '#6F1F7A',
  },
  tabLinearGradientContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 25,
    marginRight: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselGameCardContainer: {
    position: 'relative',
    // paddingHorizontal: 10,
  },
  carouselGameImage: {
    width: wp(80),
    height: hp(60),
    borderRadius: 15,
    resizeMode: 'cover',
  },
  carouselGameText: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 25,
    width: wp(80),
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  carouselGametitle: {
    width: wp(80),
    color: '#fff',
    fontSize: 5.5,
    marginBottom: hp(0.7),
  },
  carouselGameSubtitle: {
    color: '#fff',
    fontSize: 3.5,
  },
  carouselVideoAward: {
    color: '#fff',
    fontSize: 4,
  },
  carouselVideoWatchStatus: {
    color: '#fff',
    fontSize: 3.5,
  },
  gameListContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDFAFB',
    marginBottom: 15,
    padding: 14,
    borderRadius: 15,
  },
  gameListAvatar: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 60 / 2,
  },
  gameListTitle: {
    fontSize: 4.5,
    color: Colors.balckText,
    fontWeight: '500',
    marginBottom: hp(0.5),
  },
  gameListSubTitle: {
    fontSize: 3.5,
    fontWeight: 'bold',
    color: Colors.grayText,
  },
  linearGradientContainer: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  heroGameImage: {
    width: wp(100) - 70,
    height: hp(30),
    borderRadius: 15,
    resizeMode: 'cover',
  },
  heroGameText: {
    position: 'absolute',
    bottom: 0,
    padding: 12,
    width: wp(100) - 70,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  heroGameTitle: {
    width: wp(70),
    color: '#fff',
    fontSize: 5.5,
    marginBottom: hp(0.7),
  },
  heroGameAward: {
    fontSize: 3.5,
    fontWeight: 'bold',
    color: '#fff',
  },
  playButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: wp(100) - 70,
    height: wp('14%'),
    marginBottom: 0,
  },
  gameDetailContainer: {
    paddingHorizontal: 20,
  },
  gameDetailStatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statsItemContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
  },
  statsTitle: {
    fontSize: 5.2,
    marginBottom: hp(0.3),
    fontWeight: '500',
    color: Colors.balckText,
  },
  statsValue: {
    fontSize: 3.7,
    fontWeight: 'bold',
    color: '#A3A4AB',
  },
  gameDetailsSectionTitle: {
    fontSize: 4.9,
    marginBottom: 15,
    fontWeight: '700',
    color: Colors.balckText,
  },
  gameDetailsSectionSubTitle: {
    fontSize: 4.2,
    marginBottom: 15,
    fontWeight: '500',
    color: '#A3A4AB',
  },
  gameDetailsDescription: {
    color: '#A3A4AB',
    fontSize: 3.5,
    lineHeight: 22,
  },
  recentPlayerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  recentPlayerItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FDFAFB',
    marginBottom: 15,
    padding: 14,
    borderRadius: 15,
  },
  recentPlayerProfile: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    borderRadius: 35 / 2,
    marginLeft: 15,
  },
  recentPlayerCountryFlag: {
    position: 'absolute',
    bottom: 1,
    right: 2,
    borderRadius: 5,
  },
  recentPlayerName: {
    fontSize: 4,
    color: Colors.balckText,
    fontWeight: '500',
  },
  recentPlayerLgx: {
    fontSize: 4.5,
    color: '#6F1F7A',
    fontWeight: '500',
    marginBottom: hp(0.2),
  },
  recentPlayerUsdt: {
    fontSize: 3.5,
    fontWeight: 'bold',
    color: Colors.grayText,
  },
});

export default styles;
