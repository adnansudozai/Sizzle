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
  Button,
  Loader
} from '../../../../components';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';
import { update_profile } from '../../../../Api/Api';
import { useSelector } from 'react-redux';
import {connect} from 'react-redux';
import {saveUserdata} from '../../../../redux/actions/userDataAction'
const Account = props => {
  let data=useSelector(state => state.userdataReducer)
console.log('userdata',data);
  const [name, setName] = useState(data.userdata.full_name?data.userdata.full_name:'');
  const [email, setEmail] = useState(data.userdata.email?data.userdata.email:'');
  const [address, setAddress] = useState(data.userdata.wallet_address?data.userdata.wallet_address:'0X1234');
  const [profileimage, setprofileimage] = useState('');
  const [errormesssage, seterrormesssage] = useState('');
  const [isError, setisError] = useState(false);
  const [loading, setloading] = useState(false);
  
  
  const choseimage = async() => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      base64:true
    }).then(image => {
      console.log(image);
      setprofileimage(image)
    });

  }
  const updatedata=async()=>{
    if (!name) {
      setisError(true)
      seterrormesssage('Please Enter your Name')
    } 
    else if (!email) {
      setisError(true)
      seterrormesssage('Please Enter your email')
    } 
    
    else {
      const formData = new FormData();
      formData.append("user[wallet_address]", address);
      formData.append("user[full_name]", name);
      formData.append("user[email]", email);
      if (profileimage != "") {

        var photo = {
          uri: profileimage.path,
          type: profileimage.mime,
          name: 'photo.jpg',
      };

      formData.append("user[image]", photo);


      }



      setloading(true)
      await update_profile(formData,data.barerToken)
  .then((res) => {
    console.log('responsz====>>',res);
     

    if(res.status==201){
      props.saveUserdata(res.data.user, data.barerToken)
     props.navigation.navigate('DashboardTabNavigator')
     Toast.show('Record Updated!', Toast.LONG);
    setloading(false)


    }
    else{
      console.log('else true');
      setloading(false)
    }

  }).catch((err) => {
    setloading(false)
    seterrormesssage(err.data.error)
    setisError(true)
console.log('err',err.data.error);


  })

    }
        }
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
              {profileimage==''?
            <TouchableOpacity
            onPress={()=>choseimage()}
            style={styles.profileView}>
             {!data.userdata.image_url? <Image
                source={Images.profileImage}
                style={{width: 80, height: 80,borderRadius:2, resizeMode: 'cover'}}
              />
              :
              <Image
                source={{uri:data.userdata.image_url}}
                style={{width: 100, height: 100,borderRadius:100/2, resizeMode: 'cover'}}
              />
          }
            </TouchableOpacity>
:
            <TouchableOpacity
            onPress={()=>choseimage()}
            style={styles.profileView}>
          
              <Image
                source={{uri:profileimage.path}}
                style={{width: 100, height: 100,borderRadius:100/2, resizeMode: 'cover'}}
              />
          
            </TouchableOpacity>
            }
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
                placeholder={'Wallet Address'}
                value={address}
        
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
{isError?
            <ResponsiveText
                  style={{marginTop:10,color:'red',marginLeft: 10,}}>{errormesssage}</ResponsiveText>

                  :null}
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
            <Button
              title={'Save'}
              onPress={()=>updatedata()}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 5,
                marginTop: 30,
                borderRadius: 30,
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Loader loading={loading} />

    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserdata: (data,token) => dispatch(saveUserdata(data,token)),
  };
};
export default connect(null, mapDispatchToProps)(Account);

