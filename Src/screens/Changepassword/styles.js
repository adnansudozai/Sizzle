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
  registerInputView: {
    top: hp(6),
    width: '90%',
    alignSelf: 'center',
  },
  register: {
    color: '#FC4070',
    marginLeft: 5,
    fontWeight:'bold'
  },
  forgotview:{
    borderWidth:0,
    marginHorizontal:wp(6),
    marginTop:hp(15),
    justifyContent:'center',
    alignItems:'center'

  },

  haveAccount: {
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  alreadyHaveAccount: {
    marginTop: 120,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  loginAccount: {
    color: '#000',
    marginTop: '30%',
     textAlign:'center',
    fontSize: 9,
    width: '90%',
  },
  splash: {
    alignSelf: 'center',
    width: wp(60),
    height: wp(20),
    resizeMode: 'contain',
  },
  appName: {
    alignSelf: 'center',
    fontSize: 4,
    // fontWeight:'bold'
  },
  box: {
    height: 100,
    width: 150,
    borderRadius: 5,
    marginVertical: 40,
    backgroundColor: '#61dafb',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  SetYourPin: {
    alignSelf: 'center',
    color: '#000',
    marginTop: 40,
    fontSize: 9,
  },
  application: {
    alignSelf: 'center',
    color: '#94959B',
    marginTop: 40,
    fontSize: 4,
  },
  errormessage:{
    fontSize:5,
    color:'red'
  },
  errorview:{
    borderWidth:0,
    marginHorizontal:wp(6),
    alignItems:'center',marginTop:hp(6)
  }
});

export default styles;
