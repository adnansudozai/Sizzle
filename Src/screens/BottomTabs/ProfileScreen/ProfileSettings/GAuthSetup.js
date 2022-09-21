import React, {useState} from 'react';
import {View, TouchableOpacity, Switch} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {
  Container,
  ResponsiveText,
  Header,
  GradientButton,
} from '../../../../components';
import styles from './styles';

const GAuthSetup = props => {
  const [gAuthSet, setGAUthSet] = useState(false);

  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        title={'Link Now or Download Google Authenticator'}
        leftIcon={'chevron-left'}
        textColor={'#000'}
        titleFontSize={4}
      />
      <View style={[styles.mainContainer]}>
        <View
          style={{
            marginTop: hp(6),
            paddingHorizontal: 20,
          }}>
          <ResponsiveText
            style={
              styles.securityInfoText
            }>{`Please downlaod and install Google AUthenticator first and then link your Legion Network account with it`}</ResponsiveText>
          <View
            style={[styles.securityItem, {paddingTop: 22, paddingBottom: 22}]}>
            <View>
              <ResponsiveText
                style={
                  styles.securityItemTitle
                }>{`Google Authenticator`}</ResponsiveText>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('settingsGAuthBackup')}>
              <Icon name={'chevron-right'} size={25} color={'#A3A4AB'} />
            </TouchableOpacity>
          </View>
          {gAuthSet ? (
            <GradientButton
              onPress={() => setGAUthSet(!gAuthSet)}
              title={'Set Up'}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 15,
                marginTop: 40,
              }}
              gradientColor={['#163272', '#4674c3']}
              shadowColor="#BCC9E4"
            />
          ) : (
            <View style={styles.gAuthToggle}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons name={'ios-logo-google'} size={25} color={'#A3A4AB'} />
                <View style={{}}>
                  <ResponsiveText style={styles.gAuthToggleTitle}>
                    {'Google Authenticator'}
                  </ResponsiveText>
                  <TouchableOpacity onPress={() => {}}>
                    <ResponsiveText
                      style={[
                        styles.gAuthSubTitle,
                        {marginLeft: 20},
                      ]}>{`Off`}</ResponsiveText>
                  </TouchableOpacity>
                </View>
              </View>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={gAuthSet ? '#4674c3' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setGAUthSet(!gAuthSet)}
                value={gAuthSet}
              />
            </View>
          )}
          <GradientButton
            onPress={() => {}}
            title={'Tutorial Video For setting Up Google Authenticator'}
            titleStyle={{fontSize: 3.5}}
            btnContainer={{
              borderRadius: 15,
              marginTop: hp(37),
            }}
            gradientColor={['#163272', '#4674c3']}
            shadowColor="#BCC9E4"
          />
        </View>
      </View>
    </Container>
  );
};

export default GAuthSetup;
