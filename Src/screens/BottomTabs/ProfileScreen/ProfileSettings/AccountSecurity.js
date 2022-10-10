import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  ResponsiveText,
  Header,
  GradientButton,
} from '../../../../components';
import styles from './styles';

const AccountSecurity = props => {
  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        title={'Account Security'}
        leftIcon={'chevron-left'}
        textColor={'#000'}
      />
      <View style={[styles.mainContainer]}>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: hp(6),
          }}>
          <ResponsiveText
            style={
              styles.securityInfoText
            }>{`In this section you will be able to set the account security`}</ResponsiveText>
          <View>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Changepassword')} style={styles.securityItem}>
              <View>
                <ResponsiveText
                  style={
                    styles.securityItemTitle
                  }>{`Change Password`}</ResponsiveText>
                <ResponsiveText
                  style={
                    styles.securityItemSubtitle
                  }>{`*********`}</ResponsiveText>
              </View>
              <TouchableOpacity onPress={() => {}}>
                <Icon name={'chevron-right'} size={25} color={'#A3A4AB'} />
              </TouchableOpacity>
            </TouchableOpacity>
            <View style={styles.securityItem}>
              <View>
                <ResponsiveText
                  style={
                    styles.securityItemTitle
                  }>{`Change Pin`}</ResponsiveText>
                <ResponsiveText
                  style={
                    styles.securityItemSubtitle
                  }>{`*****64`}</ResponsiveText>
              </View>
              <TouchableOpacity onPress={() => {}}>
                <Icon name={'chevron-right'} size={25} color={'#A3A4AB'} />
              </TouchableOpacity>
            </View>
            <View style={[styles.securityItem, {paddingVertical: 22}]}>
              <View>
                <ResponsiveText
                  style={
                    styles.securityItemTitle
                  }>{`Google Authenticator`}</ResponsiveText>
              </View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('settingsGAuthSetup')}>
                <Icon name={'chevron-right'} size={25} color={'#A3A4AB'} />
              </TouchableOpacity>
            </View>
          </View>
          <GradientButton
            onPress={() => {}}
            title={'Delete my Data'}
            titleStyle={{fontSize: 4.5}}
            btnContainer={{
              borderRadius: 15,
              marginTop: hp(30),
            }}
            gradientColor={['#FE324A', '#FE324A']}
            shadowColor="#FFA5B1"
          />
        </View>
      </View>
    </Container>
  );
};

export default AccountSecurity;
