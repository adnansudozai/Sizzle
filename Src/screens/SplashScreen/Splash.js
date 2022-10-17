
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {Container, Images, ResponsiveText} from '../../components';
import styles from './styles';
import {CommonActions} from '@react-navigation/routers';
import {connect} from 'react-redux';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { checkUserLogin } from '../../Api/Api';
export default function Splash(props){
  let userdata=useSelector(state => state)
  let isLogin=checkUserLogin()

  useEffect(() => {
    const timer = setTimeout(() => {

      checkUserLogin((res)=>{
        console.log('Is Login',res);
      
 if(res==true){
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {                                         
  
              name: 'Createpin',
            
            },
          ],
        }),
      );
    }
    else {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Login',
          
            },
          ],
        }),
      );
     
  
      }
    })
      // props.navigation.navigate('DashboardTabNavigator');
    }, 2000);
    return () => clearTimeout(timer);
  }, [props.navigation]);

  return (
    <Container backgroundColor={'white'}>
      <View style={styles.mainContainer}>
        {/*  */}
        <View
          style={[
            styles.box,
            {
              transform: [{rotateX: '45deg'}, {rotateZ: '60deg'}],
            },
          ]}>
          <Image source={Images.splash} style={styles.splash} />
        </View>
        <ResponsiveText
          style={{
            alignSelf: 'center',
            fontSize: 6,
            color: '#000',
          }}>
          {'Sizzle Wallet'}
        </ResponsiveText>
      </View>
    </Container>
  );
}
