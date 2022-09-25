import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
StyleSheet,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Container,
  ResponsiveText,
  Header,
  Images,
  InputField,
  GradientButton,
} from '../../../../components';

const AccountVerfication = props => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        title={'Verification'}
        leftIcon={'chevron-left'}
        textColor={'#000'}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <View
            style={{
              marginTop: hp(6),
              paddingHorizontal: 20,
            }}>
            <View style={{marginTop: 10}}>
              <ResponsiveText
                style={[styles.inputLabel]}>{`Email`}</ResponsiveText>
              <InputField
                autoCapitalize="none"
                color={'#000'}
                placeholder={''}
                value={email}
                keyboardType="email-address"
                onChangeText={email => setEmail(email)}
                backgroundColor={'#fff'}
                customStyles={{
                  borderColor: '#eee',
                  borderWidth: 1,
                  borderRadius: 15,
                }}
                marginTop={10}
              />
            </View>
            <View style={{marginTop: 30}}>
              <ResponsiveText
                style={styles.inputLabel}>{`Password:`}</ResponsiveText>
              <InputField
                autoCapitalize="none"
                color={'#000'}
                placeholder={''}
                value={password}
                keyboardType="email-address"
                onChangeText={password => setPassword(password)}
                backgroundColor={'#fff'}
                customStyles={{
                  borderColor: '#eee',
                  borderWidth: 1,
                  borderRadius: 15,
                }}
                marginTop={10}
              />
            </View>
            <View style={{marginTop: 30}}>
              <ResponsiveText
                style={
                  styles.inputLabel
                }>{`Code from Authenticator:`}</ResponsiveText>
              <InputField
                autoCapitalize="none"
                color={'#000'}
                placeholder={''}
                value={authCode}
                keyboardType="email-address"
                onChangeText={authCode => setAuthCode(authCode)}
                backgroundColor={'#fff'}
                customStyles={{
                  borderColor: '#eee',
                  borderWidth: 1,
                  borderRadius: 15,
                }}
                marginTop={10}
              />
            </View>
            <GradientButton
              onPress={() => {}}
              title={'Submit'}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 15,
                marginTop: hp(28),
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

export default AccountVerfication;
const styles = StyleSheet.create({
  inputLabel:{color:'black'}
});
