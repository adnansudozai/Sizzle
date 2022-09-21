import {Image, useColorScheme, View, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {Container, Images, ResponsiveText} from '../../components';
import styles from './styles';

export default function Splash(props) {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login');
      
      // props.navigation.navigate('DashboardTabNavigator');
    }, 3000);
  }, []);

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
