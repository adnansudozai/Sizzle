import React, {useState} from 'react';
import styles from './styles';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  Container,
  ResponsiveText,
  GradientButton,
  Images,
} from '../../../components';
import { commify } from 'ethers/lib/utils';

const Profile = props => {
  const [theme, setTheme] = useState('LIGHT');
   
  const settingItemsData = [
    {
      icon: 'bell-outline',
      name: 'Noticfications',
      to: 'Notification',
    },
    {
      icon: 'check',
      name: 'Account Verification',
      to: 'settingsAccountVerfication',
    },
    {
      icon: 'bank-outline',
      name: 'Bank Information',
      to: '',
    },
    {
      icon: 'wallet-outline',
      name: 'My Account',
      to: '',
    },
    {
      icon: 'cog-outline',
      name: 'Preference',
      to: '',
    },
    {
      icon: 'help-circle-outline',
      name: 'Help Center',
      to: 'FAQ',
    },
    {
      icon: 'gift-outline',
      name: 'Referral',
      to: 'settingsReferrals',
    },
    {
      icon: 'account-group',
      name: 'Community',
      to: 'Community',
    },
  ];

  const renderSettingsItem = (item, navigation) => {
    
    return (
      <View style={styles.settingItemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name={item.icon} size={25} color={'#A3A4AB'} />
          <ResponsiveText style={styles.settingItemText}>
            {item.name}
          </ResponsiveText>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProfileSettings', {screen: item.to})
          }>
          <Icon name={'chevron-right'} size={25} color={'#A3A4AB'} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Container backgroundColor={'white'}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.profileView}>
            <Image
              source={Images.profileImage}
              style={{width: 100, height: 100, resizeMode: 'contain'}}
            />
          </View>
          <View
            style={{
              marginTop: hp(4),
              paddingHorizontal: 20,
            }}>
            <View style={styles.miniProfilePreview}>
              <View style={{}}>
                <View style={styles.previewName}>
                  <ResponsiveText
                    style={
                      styles.previewNameText
                    }>{`Wade Warren`}</ResponsiveText>
                  <Icon name={'check-circle'} size={15} color="#194AA1" />
                </View>
                <ResponsiveText
                  style={
                    styles.otherPreviewItem
                  }>{`33xnQfsadooX5e`}</ResponsiveText>
                <ResponsiveText
                  style={
                    styles.otherPreviewItem
                  }>{`wade@mail.com`}</ResponsiveText>
              </View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ProfileSettings')}>
                <Icon name={'chevron-right'} size={25} color={'#A3A4AB'} />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: hp(4)}}>
              <FlatList
                data={settingItemsData}
                renderItem={({item}) =>
                  renderSettingsItem(item, props.navigation)
                }
              />
            </View>
          </View>
          <View style={styles.darkModeButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icons name={'ios-moon-outline'} size={25} color={'#A3A4AB'} />
              <View>
                <ResponsiveText style={styles.settingItemText}>
                  {'Dark Mode'}
                </ResponsiveText>
                <ResponsiveText
                  style={[
                    styles.otherPreviewItem,
                    {marginLeft: 20},
                  ]}>{`Off`}</ResponsiveText>
              </View>
            </View>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={theme == 'DARK' ? '#4674c3' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setTheme(theme == 'LIGHT' ? 'DARK' : 'LIGHT')
              }
              value={theme == 'LIGHT' ? false : true}
            />
          </View>
          <View>
            <GradientButton
              onPress={() => props.navigation.navigate('Login')}
              title={'Logout'}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 15,
                marginBottom: 40,
              }}
              gradientColor={['#FE324A', '#FE324A']}
              shadowColor="#FFA5B1"
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Profile;

