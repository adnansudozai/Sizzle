import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Container, Images, Button, ResponsiveText} from '../../components';
import Color from '../../themes/colors';
import {CommonActions} from '@react-navigation/routers';
import ReactNativePinView from 'react-native-pin-view';
import {connect} from 'react-redux';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Toast from 'react-native-simple-toast';

const CreatePin = props => {
  const [loading, setLoading] = useState(false);
  
//   useEffect(() => {
//     // if (props.isfingerActive == true) {
//     //   biometric();
//     // }
//   }, []);


  const pinView = useRef(null);
  const [enteredPin, setEnteredPin] = useState('');
  const biometric = () => {
    try {
      if (props.isLogin == true) {
        FingerprintScanner.isSensorAvailable()
          .then(() => {
            FingerprintScanner.authenticate({
              description: 'Verify Your Identity',
              cancelButton: 'Cancel',
            })
              .then(async () => {
                console.log('successssss====>>>>>>>>>>>>>>>>>>>>');

                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'DashboardTabNavigator',
                      },
                    ],
                  }),
                );

                FingerprintScanner.release();
              })
              .catch(error => {
                console.log('Failed====>>>>>>>>>>>>>>>>>>>>', error);
                FingerprintScanner.release();
              });
          })
          .catch(error => {
            console.log('no sensor available');
            console.log('catch====>>>>>>>>>>>>>>>>>>>>', error);
            FingerprintScanner.release();
          });
      } else {
        // props.userLogin(true);

        FingerprintScanner.isSensorAvailable()
          .then(() => {
            FingerprintScanner.authenticate({
              description: 'Verify Your Identity',
              cancelButton: 'Cancel',
            })
              .then(async () => {
                console.log('successssss====>>>>>>>>>>>>>>>>>>>>');

                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'DashboardTabNavigator',
                      },
                    ],
                  }),
                );

                FingerprintScanner.release();
              })
              .catch(error => {
                console.log('Failed====>>>>>>>>>>>>>>>>>>>>', error);
                FingerprintScanner.release();
              });
          })
          .catch(error => {
            console.log('no sensor available');
            console.log('catch====>>>>>>>>>>>>>>>>>>>>', error);
            FingerprintScanner.release();
          });
      }
    } catch (error) {
      console.log('try catch', error);
    }
  };

  const onSubmit = () => {

    console.log(props.userPin,enteredPin);
  
      if (props.userPin === enteredPin) {

        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'DashboardTabNavigator',
                // name: 'DashboardTabNavigator',
                // name: "Biometric",
              },
            ],
          }),
        );
      } else {
        Toast.show('Incorrect PIN');
      }
    
  };

  return (
    <Container backgroundColor={'white'}>
      <View style={styles.conntainer}>
        <TouchableOpacity
          // onPress={() => props.navigation.goBack()}
          style={styles.touchmain}>
          <View style={styles.viewimg}>
            {/* <Image source={Images.leftarrow} style={styles.leftarrow} /> */}
          </View>
          <View style={styles.textmain}>
            <ResponsiveText style={{...styles.viewtxt}}>
              {'Enter PIN'}
            </ResponsiveText>
          </View>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ReactNativePinView
            inputSize={20}
            ref={pinView}
            pinLength={4}
            buttonSize={40}
            onValueChange={value => setEnteredPin(value)}
            buttonAreaStyle={{
              marginTop: 20,
            }}
            inputAreaStyle={{
              marginBottom: 50,
            }}
            inputViewEmptyStyle={{
              marginTop: hp(15),
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: Color.BtnBackground,
            }}
            inputViewFilledStyle={{
              marginTop: hp(15),
              backgroundColor: Color.BtnBackground,
            }}
            buttonViewStyle={{
              marginTop: 10,
              borderWidth: 1,
              borderColor: 'white',
            }}
            buttonTextStyle={{
              color: 'black',
            }}
            customRightButton={
              <TouchableOpacity
                hitSlop={{left: 12, right: 12, top: 12, bottom: 16}}
                onPress={() => pinView.current.clear()}>
                <Image
                  source={Images.crosicon}
                  style={styles.rightarrowicon}
                />
              </TouchableOpacity>
            }
            customLeftButton={
              <View>
                {props.isfingerActive == true && (
                  <TouchableOpacity onPress={() => biometric()}>
                    <Image
                      source={
                        Platform.OS == 'ios' ? Images.face : Images.finger
                      }
                      style={styles.rightarrowicon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            }
          />
          <Button
            loading={loading}
            title={'Done'}
            onPress={onSubmit}
            titleStyle={{fontSize: 4.5}}
            btnContainer={{
              borderRadius: 5,
              marginTop: 30,
              borderRadius: 30,
            }}
          />
        </ScrollView>
      </View>
    </Container>
  );
};


const mapStateToProps = state => {
  console.log('state==>>>', state);
  return {
   
    userPin: state.userdataReducer.userpin,
  
  };
};
export default connect(mapStateToProps, null)(CreatePin);


const styles = StyleSheet.create({
  conntainer: {
    flex: 1,
    paddingHorizontal:wp(5),
    backgroundColor: Color.backgroundColor,
  },
 
 
  touchmain: {
    justifyContent:'center',
    marginHorizontal: wp(4),
    flexDirection: 'row',
    marginTop:hp(3),
    borderWidth:0
  },

  viewimg: {
    alignSelf: 'center',
  },
  leftarrow: {
    height: 24,
    width: 24,
    alignSelf: 'center',
  },
  viewtxt: {
    color: 'black',
    fontSize: 6,
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0.02,
    position: 'absolute',
  },
  textmain: {
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 0,
    width: wp(80),
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
  },
  rightarrowicon: {
    height: wp(7), 
    width: wp(7), 
    marginTop: 10
  },
  
});


