import React,{useState} from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Share,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  ResponsiveText,
  Header,
  Images,
  GradientButton,
} from '../../../../components';
import styles from './styles';

const Referrals = props => {
const [myreferalcode,setmyreferalcode]=useState('WADEF5RCT3T4DF3')
  const onSubmit = async () => {
    try {
      const result = await Share.share({
        message: myreferalcode,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('cshare with active type');
        } else {
          // shared
        
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  const renderReferralItem = ({item}) => {
    return (
      <View style={styles.myInvitesItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={Images.profileImage}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
              marginRight: 15,

            }}
          />
          <ResponsiveText style={styles.inviteCode}>{item}</ResponsiveText>
        </View>
        <Icon
          name={'checkbox-marked-circle-outline'}
          size={25}
          color={'#92CE95'}
        />
      </View>
    );
  };

  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        title={'Referral'}
        leftIcon={'chevron-left'}
        textColor={'#000'}
      />
      <ScrollView>
        <View style={[styles.mainContainer]}>
          <View
            style={{
              marginTop: hp(6),
              paddingHorizontal: 20,
            }}>
            <View style={{alignItems: 'center'}}>
              <LinearGradient
                colors={['#163272', '#4674c3']}
                style={{
                  height: wp('30%'),
                  width: wp('30%'),
                  borderRadius: wp('15%'),
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Icon name={'gift'} size={75} color={'#fff'} />
              </LinearGradient>
            </View>
            <ResponsiveText
              style={
                styles.inviteTitle
              }>{`Invite your friends and get up to $100 for both of you!`}</ResponsiveText>
            <View style={styles.inviteShareCard}>
              <Image
                source={Images.profileImage}
                style={{width: 50, height: 50, resizeMode: 'contain'}}
              />
              <View>
                <ResponsiveText
                  style={
                    styles.inviteInfotext
                  }>{`My Referral Code`}</ResponsiveText>
                <ResponsiveText
                  style={styles.inviteCode}>{`WADEWARN459`}</ResponsiveText>
              </View>
              <TouchableOpacity onPress={() => {}}>
                <Icon name={'content-copy'} size={25} color={'#A3A4AB'} />
              </TouchableOpacity>
            </View>
            <GradientButton
              onPress={() => onSubmit()}
              title={'Share'}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 15,
                marginTop: 15,
              }}
              gradientColor={['#163272', '#4674c3']}
              shadowColor="#BCC9E4"
            />
            <View style={{marginVertical: hp(8)}}>
              <ResponsiveText
                style={styles.myInviteTitle}>{`My Invites`}</ResponsiveText>
              <View style={{marginTop: hp(1)}}>
                <FlatList
                  data={[
                    'Tyrone Daniels',
                    'Say Pawners',
                    'Maddlew Moorey',
                    'Twa Maddis',
                  ]}
                  renderItem={renderReferralItem}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Referrals;
