import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../../../themes/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headertitle: {
    fontWeight: '500',
    color: '#1F1F1F',
    fontSize: 5,
  },
  headerSubtitle: {
    color: '#929292',
    fontSize: 3.5,
  },
  courseList: {marginTop: hp(3.5), paddingHorizontal: 20},
  cardContainer: {
    marginBottom: hp(2),
    position: 'relative',
  },
  cardImage: {
    width: wp(90),
    height: hp(22),
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardText: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  coursetitle: {
    color: '#fff',
    fontSize: 5,
    fontWeight: '500',
  },
  courseSubtitle: {
    color: '#E6E6E6',
    fontSize: 3.5,
  },
  videoList: {marginTop: hp(4), paddingHorizontal: 20, marginBottom: hp(10)},
  playlistItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 17,
    padding: 9,
    marginBottom: hp(2.2),
  },
  playlistVideoThumbnail: {
    width: wp(13.8),
    height: hp(7.5),
    borderRadius: 7,
    resizeMode: 'cover',
  },
  playlistVideotitle: {
    width: wp(60),
    fontWeight: '500',
    color: Colors.balckText,
    fontSize: 3.7,
    marginBottom: hp(0.3),
  },
  playlistVideoAward: {
    color: '#0F33AD',
    fontWeight: '500',
    fontSize: 3,
    marginBottom: hp(0.3),
  },
  playlistVideoWatchStatus: {
    color: Colors.grayText,
    fontSize: 3,
  },
  carouselVideoCardContainer: {
    position: 'relative',
  },
  carouselVideoImage: {
    width: wp(85),
    height: hp(27),
    borderRadius: 15,
    resizeMode: 'cover',
  },
  carouselVideoText: {
    position: 'absolute',
    bottom: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: wp(85),
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  carouselVideotitle: {
    width: wp(70),
    color: '#fff',
    fontSize: 5.5,
    marginBottom: hp(0.7),
  },
  carouselVideoAward: {
    color: '#fff',
    fontSize: 4,
  },
  carouselVideoWatchStatus: {
    color: '#fff',
    fontSize: 3.5,
  },
  popuptitle: {
    color: Colors.balckText,
    fontSize: 4.5,
    fontWeight: '700',
    marginBottom: hp(3),
  },
  popupCoursetitle: {
    fontWeight: '500',
    color: Colors.balckText,
    fontSize: 15,
    marginBottom: hp(1),
  },
  popupCourseListContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  popupCourseListItem: {
    width: wp(42),
  },
});

export default styles;
