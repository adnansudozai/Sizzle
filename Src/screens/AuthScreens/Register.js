import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Text
} from 'react-native';
import {Container, ResponsiveText, InputField, Button,Loader} from '../../components';
import styles from './styles';
import { register_User,Userlogin } from '../../Api/Api';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import { saveUserdata } from '../../redux/actions/userDataAction';
const Register = props => {


  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [refferalcode, setrefferalcode] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [errormessage, seterrormessage] = useState('');
  const [iserror, setiserror] = useState(false);
  const [Loading, setloading] = useState(false);
  const [showpass, setshowpass] = useState(false);
  const [showconfrmpass, setshowconfrmpass] = useState(false);



   const register=async()=>{

if (!emailInput) {
  setiserror(true)
  seterrormessage('Email Require')
} else if (!passwordInput) {
  setiserror(true)
  seterrormessage('Password Require')
} 
else if (!confirmpassword) {
  setiserror(true)
  seterrormessage('Enter Confirm Password')
} 
else if (passwordInput!=confirmpassword) {
  setiserror(true)
  seterrormessage(`Password can't match`)
} 

else{
  setloading(true)
let user={ user:{
   "email": emailInput,
    "password": passwordInput,
   "password_confirmation": confirmpassword,
   "refferal_code": refferalcode
}
}
await register_User(user)
  .then((res) => {
    console.log(res.data.user,'res');
if(res.status==200){
  setiserror(true)
  seterrormessage(res.data.message)
setloading(false)

}
else{
  props.saveUserdata(res.data.user)
  Userlogin(true)

  setloading(false)
  Toast.show('Successfully Register!');
  props.navigation.navigate('PinScreen')
}

  }).catch((err) => {

console.log(err);
setloading(false)


  })


}



   


  }
  return (
    <Container backgroundColor={'white'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <ResponsiveText style={styles.loginAccount}>
            {'Register new account'}
          </ResponsiveText>
          <View style={styles.registerInputView}>
            <InputField
              autoCapitalize="none"
              placeholder={'Enter Refferal Code'}
              value={refferalcode}
              color={'#000'}
              onChangeText={text => {setiserror(false),setrefferalcode(text)}}
              borderRadius={30}
              backgroundColor={'#F1F1F5'}
            />
            <View style={{marginTop: 10}}>
              <InputField
                autoCapitalize="none"
                placeholder={'Email'}
                color={'#000'}
                value={emailInput}
                onChangeText={text => {setiserror(false), setEmailInput(text)}}
                borderRadius={30}
                backgroundColor={'#F1F1F5'}
              />
            </View>
            <View style={{marginTop: 10}}>
              <InputField
                autoCapitalize="none"
                placeholder={'Password'}
                value={passwordInput}
                color={'#000'}
          
                secureTextEntry={!showpass?true:false}
                
                onChangeText={passwordInput => {setiserror(false), setPasswordInput(passwordInput)}}
                borderRadius={30}
                backgroundColor={'#F1F1F5'}
                rightIconName={showpass?'eye':'eye-off'}
                righIconOnPress={()=>setshowpass(!showpass)}
              />
            </View>
            <View style={{marginTop: 10}}>
              <InputField
                autoCapitalize="none"
                placeholder={'Confirm Password'}
                value={confirmpassword}
                color={'#000'}
                secureTextEntry={!showconfrmpass?true:false}
                rightIconName={showconfrmpass?'eye':'eye-off'}
                righIconOnPress={()=>setshowconfrmpass(!showconfrmpass)}
                onChangeText={passwordInput =>  {setiserror(false),setconfirmpassword(passwordInput)}}
                borderRadius={30}
                backgroundColor={'#F1F1F5'}
              />
               {iserror?
               <Text style={{color:'red',marginTop:40,alignSelf:'center'}}>
                {errormessage}
              </Text>
               :null
              }
            </View>
         
            <Button
              title={'Register'}
              onPress={() =>register()}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 5,
                marginTop: 30,
                borderRadius: 30,
              }}
            />
          </View>

          <Pressable
            style={styles.alreadyHaveAccount}
            onPress={() => props.navigation.navigate('Login')}
            hitSlop={{width: 20, height: 20, left: 20, right: 20}}>
            <ResponsiveText
              style={{
                color: '#94959B',
              }}>{`Already have an account?`}</ResponsiveText>
            <ResponsiveText style={styles.register}>{'Login'}</ResponsiveText>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
      <Loader loading={Loading} />
    </Container>
  );
};


const mapDispatchToProps = dispatch => {
  return {
    saveUserdata: data => dispatch(saveUserdata(data)),
  };
};
export default connect(null, mapDispatchToProps)(Register);
