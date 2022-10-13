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
  Button,
} from '../../../../components';
import { email_verification,verifay_authcode } from '../../../../Api/Api';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

const AccountVerfication = props => {
  const [verifay, setverifay] = useState(false);
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [error, seterror] = useState(false);
  const [errormessage, seterrormessage] = useState('');
  let userdata=useSelector(state => state.userdataReducer)

  const getvirifaycode=async()=>{
if (!email) {
  seterror(true)
  seterrormessage('Enter Email')
} else {

  try {
    let data={
      user:{
        "email":email

    }
    }
    await email_verification(data, userdata.barerToken).then((res)=>{
      console.log('ressssssss',res);
      if(res.data.error?res.data.error:null){
        seterror(true)
        seterrormessage(res.data.error[0])
      }
      else{
        // seterror(true)
        // seterrormessage('Check your email')
        Toast.show('Check Your Email!', Toast.LONG);

        setverifay(true)

      }
    }).catch((error)=>{
      console.log('error is',error);

    })
    
  } catch (error) {
    console.log('catch error',error);
  }
}
  }
  const verifaycode=async()=>{
    if (!authCode) {
      seterror(true)
      seterrormessage('Enter Auth code')
    } else {
      try {
        let data={'confirmation_token':authCode }
        await verifay_authcode(data).then((res)=>{
          console.log('ressssssss',res);
         
        }).catch((error)=>{
          console.log('error is',error);
          // setverifay(false)
    
        })
        
      } catch (error) {
        console.log('catch error',error);
      } 
      
    }
      }
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
              {!verifay?
            <View style={{marginTop: 10}}>
              <ResponsiveText
                style={[styles.inputLabel]}>{`Email`}</ResponsiveText>
              <InputField
                autoCapitalize="none"
                color={'#000'}
                placeholder={'Enter Email'}
                value={email}
                keyboardType="email-address"
                onChangeText={email => {setEmail(email),seterror(false)}}
                backgroundColor={'#fff'}
                customStyles={{
                  borderColor: '#eee',
                  borderWidth: 1,
                  borderRadius: 15,
                }}
                marginTop={10}
              />
            </View>
       :
            <View style={{marginTop: 30}}>
              <ResponsiveText
                style={
                  styles.inputLabel
                }>{`Code from Authenticator:`}</ResponsiveText>
              <InputField
                autoCapitalize="none"
                color={'#000'}
                placeholder={'Enter Code here'}
                value={authCode}
                keyboardType="email-address"
                onChangeText={authCode => {setAuthCode(authCode),seterror(false)}}
                backgroundColor={'#fff'}
                customStyles={{
                  borderColor: '#eee',
                  borderWidth: 1,
                  borderRadius: 15,
                }}
                marginTop={10}
              />
              
            </View>

              }
         
          </View>
          {error?
                <ResponsiveText
                style={{marginTop:20,alignSelf: 'center',color:'red'}}>{errormessage}</ResponsiveText>
             :null}
        </View>
      </TouchableWithoutFeedback>
      {!verifay?
        <View style={{position:"absolute",bottom:'10%',alignSelf:"center",alignItems:'center'}}>

              <Button
              title={'Get Code'}
              onPress={()=>getvirifaycode()}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 5,
                borderRadius: 30,
          
              }}
            />
            </View>
           
            :
        <View style={{position:"absolute",bottom:'10%',alignSelf:"center",alignItems:'center'}}>

            <Button
              title={'Verifay'}
              onPress={()=>verifaycode()}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 5,
                borderRadius: 30,
          
              }}
            />
            </View>
            }
    </Container>
  );
};

export default AccountVerfication;
const styles = StyleSheet.create({
  inputLabel:{color:'black'}
});
