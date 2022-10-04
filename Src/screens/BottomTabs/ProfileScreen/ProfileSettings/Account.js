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
  Loader
} from '../../../../components';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import { update_profile } from '../../../../Api/Api';
import { useSelector } from 'react-redux';
const Account = props => {
  let data=useSelector(state => state.userdataReducer)
console.log('userdata',data.barerToken);
  const [name, setName] = useState(data.userdata.full_name?data.userdata.full_name:'');
  const [email, setEmail] = useState(data.userdata.email?data.userdata.email:'');
  const [address, setAddress] = useState(data.userdata.wallet_address?data.userdata.wallet_address:'');
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
      formData.append("wallet_address", address);
      formData.append("full_name", name);
      formData.append("email", email);
      if (profileimage != "") {
   
        formData.append("image", {
          uri: profileimage.uri,
          name: profileimage.fileName,
          type: profileimage.type,
        });
      }



      setloading(true)
      await update_profile(formData,data.barerToken)
  .then((res) => {
    console.log('responsz====>>',res);
     

    if(res.status==200){
      // props.saveUserdata(res.data.user)
      // props.navigation.navigate('PinScreen')
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
            <TouchableOpacity
            onPress={()=>choseimage()}
            style={styles.profileView}>
             {profileimage==''? <Image
                source={Images.profileImage}
                style={{width: 80, height: 80,borderRadius:2, resizeMode: 'stretch'}}
              />
              :
              <Image
                source={{uri:profileimage.path}}
                style={{width: 100, height: 100,borderRadius:100/2, resizeMode: 'stretch'}}
              />
          }
            </TouchableOpacity>
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
            <GradientButton
              onPress={() => updatedata()}
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
      <Loader loading={loading} />

    </Container>
  );
};

export default Account;
