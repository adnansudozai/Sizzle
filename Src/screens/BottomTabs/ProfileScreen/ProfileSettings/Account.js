import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  ResponsiveText,
  Header,
  Images,
  InputField,
  GradientButton,
} from '../../../../components';
import styles from './styles';

const Account = props => {
  const [name, setName] = useState('Wade Warren');
  const [email, setEmail] = useState('wade@mail.com');
  const [address, setAddress] = useState('33xnQfsadooX5e');

  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        title={'My Profile'}
        leftIcon={'chevron-left'}
        textColor={'#000'}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <View
            style={{
              marginTop: hp(3),
              paddingHorizontal: 20,
            }}>
            <View style={styles.profileView}>
              <Image
                source={Images.profileImage}
                style={{width: 100, height: 100, resizeMode: 'contain'}}
              />
            </View>
            <View style={{marginTop: 25}}>
              <ResponsiveText
                style={styles.inputLabel}>{`Full Name:`}</ResponsiveText>
              <InputField
                autoCapitalize="none"
                color={'#000'}
                placeholder={'Enter full Name'}
                value={name}
                keyboardType="email-address"
                onChangeText={name => setName(name)}
                backgroundColor={'#F1F1F5'}
                marginTop={10}
                borderRadius={10}
              />
            </View>
            <View style={{marginTop: 25}}>
              <ResponsiveText
                style={styles.inputLabel}>{`Email:`}</ResponsiveText>
              <InputField
                autoCapitalize="none"
                color={'#000'}
                placeholder={'Enter Email'}
                value={email}
                keyboardType="email-address"
                onChangeText={email => setEmail(email)}
                backgroundColor={'#F1F1F5'}
                marginTop={10}
                borderRadius={10}
              />
            </View>
            <View style={{marginTop: 25}}>
              <ResponsiveText
                style={styles.inputLabel}>{`Wallet Address:`}</ResponsiveText>
              <InputField
                autoCapitalize="none"
                editable={false}
                color={'#000'}
                placeholder={''}
                value={address}
                keyboardType="email-address"
                onChangeText={address => setAddress(address)}
                backgroundColor={'#F1F1F5'}
                marginTop={10}
                borderRadius={10}
                rightIconName={'content-copy'}
                rightIconColor={'#A3A4AB'}
                rightIconSize={15}
                customStyles={{color: '#A3A4AB'}}
              />
            </View>
            <View style={styles.securityPreview}>
              <View>
                <ResponsiveText
                  style={
                    styles.previewSecurityTitle
                  }>{`Account Security`}</ResponsiveText>
                <ResponsiveText
                  style={
                    styles.previewSecuritySubtitle
                  }>{`Secure`}</ResponsiveText>
              </View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('settingsAccountSecurity')
                }>
                <Icon name={'chevron-right'} size={25} color={'#A3A4AB'} />
              </TouchableOpacity>
            </View>
            <GradientButton
              onPress={() => {}}
              title={'Save'}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 15,
                marginTop: 40,
              }}
              gradientColor={['#163272', '#4674c3']}
              shadowColor="#BCC9E4"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Account;
