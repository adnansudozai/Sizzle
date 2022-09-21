import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
     justifyContent: 'center',
    
  },
  splash: {
    
    alignSelf: 'center',
    width: wp(60),
    height: wp(20),
    resizeMode:'contain'
  },
  appName:{
    alignSelf:'center',
    fontSize:4,
    // fontWeight:'bold'
    
  },
  box: {
    height: 100,
     width: 150,
    borderRadius: 5,
     marginVertical: 40,
    backgroundColor: "#61dafb",
    // alignItems: "center",
    alignSelf:'center',
    justifyContent: "center"
  },

});

export default styles;
