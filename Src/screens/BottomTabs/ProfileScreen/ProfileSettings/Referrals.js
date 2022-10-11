import React,{useState,useEffect} from 'react';
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
import { useSelector } from 'react-redux';

import {
  Container,
  ResponsiveText,
  Header,
  Images,
  Button,
} from '../../../../components';
import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-clipboard/clipboard';

import styles from './styles';
import { getRefer_user } from '../../../../Api/Api';
import { coursePlaylistDATA } from '../../HomeScreen/Empower/dummyArray';
const Referrals = props => {
let userdata=useSelector(state => state.userdataReducer)

const [myreferalcode,setmyreferalcode]=useState(userdata.userdata.referral_code?userdata.userdata.referral_code:'WADEF5RCT3T4DF3')
const [referaluser,setreferaluser]=useState([])
console.log('userdata==',userdata.userdata.image_url);
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
  useEffect(()=>{
    getallreferuser()
  },[])
  const getallreferuser=async()=>{
   try {
    await getRefer_user(userdata.barerToken).then((res)=>{
      console.log('ressss====',res);
      if(res.status==200){
        setreferaluser(res.data.referred_users);
      }
    }).catch((error)=>{
      console.log('errorrrrrrr',error);

    })
   } catch (error) {
    console.log('catch error',error);
   }
  }
  const copyhandle = () => {
    Clipboard.setString(myreferalcode);

    Toast.show('Copied.');
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
          <ResponsiveText style={styles.inviteCode}>{item.email}</ResponsiveText>
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
                colors={['#FC4070', '#FFC0CB']}
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
              {userdata.userdata.image_url?
               
                <View  style={{width: 50, height: 50,borderRadius:50/2}}>
              <Image
                source={{uri:userdata.userdata.image_url}}
                style={{width: 50, height: 50,borderRadius:50/2, resizeMode: 'cover'}}
              />
              </View>
              :
              <Image
              source={Images.profileImage}
              style={{width: 50, height: 50, resizeMode: 'contain'}}
            />
}
              <View>
                <ResponsiveText
                  style={
                    styles.inviteInfotext
                  }>{`My Referral Code`}</ResponsiveText>
                <ResponsiveText
                  style={styles.inviteCode}>{myreferalcode}</ResponsiveText>
              </View>
              <TouchableOpacity onPress={() => {copyhandle()}}>
                <Icon name={'content-copy'} size={25} color={'#A3A4AB'} />
              </TouchableOpacity>
            </View>
            <Button
              title={'Share'}
              onPress={()=>onSubmit()}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 5,
                marginTop: 30,
                borderRadius: 30,
              }}
            />
            <View style={{marginVertical: hp(8)}}>
              <ResponsiveText
                style={styles.myInviteTitle}>{`My Invites`}</ResponsiveText>
              <View style={{marginTop: hp(1)}}>
                <FlatList
                  data={referaluser}
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
