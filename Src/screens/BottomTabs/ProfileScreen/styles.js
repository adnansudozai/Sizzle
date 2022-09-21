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
  profileView: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  miniProfilePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 17,
    padding: 9,
    paddingHorizontal: 16,
  },
  previewName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  previewNameText: {
    fontSize: 4.3,
    marginRight: 5,
    color: '#000',
    fontWeight: '500',
  },
  otherPreviewItem: {
    color: '#A3A4AB',
    fontSize: 3.7,
    marginBottom: hp(0.7),
  },
  settingItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  settingItemText: {
    marginLeft: 20,
    color: '#000',
    fontWeight: '500',
  },
  darkModeButton: {
    marginTop: hp(2),
    marginBottom: hp(2),
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderColor: '#eee',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});

export default styles;
