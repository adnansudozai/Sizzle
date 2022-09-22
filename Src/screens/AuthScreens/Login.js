import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  TouchableOpacity,
  Text
} from 'react-native';
import {Container, ResponsiveText,Loader, InputField, Button} from '../../components';
import styles from './styles';
import { login_User } from '../../Api/Api';

const Login = props => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [iserror, setiserror] = useState(false);
  const [Loading, setloading] = useState(false);
  const [showpass, setshowpass] = useState(false);
  
  const usersignin=async()=>{
    let user={ user:{
      "email": emailInput,
       "password": passwordInput,
       } }
    if (!emailInput) {
      seterrorMessage('Enter email')
      setiserror(true)
    } else if(!passwordInput) {
      seterrorMessage('Enter Password')
      setiserror(true)
      
    }
    else{
      setloading(true)
 
      await login_User(user)
  .then((res) => {
    console.log('respons====>>',res);
     

    if(res.status==200){
      props.navigation.navigate('PinScreen')
    setloading(false)
    console.log('loading=====>>>>>',Loading);

    }
    else{
      console.log('else true');
      setloading(false)
    }

  }).catch((err) => {
    setloading(false)
    seterrorMessage(err.data.error)
    setiserror(true)
console.log('err',err.data.error);


  })
    }
  }

  return (
    <Container backgroundColor={'white'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <ResponsiveText style={styles.loginAccount}>
            {'Login to your account'}
          </ResponsiveText>
          <View style={styles.inputView}>
            <InputField
              autoCapitalize="none"
              color={'#000'}
              placeholder={'Email'}
              value={emailInput}
              keyboardType="email-address"
              onChangeText={emailInput => {setEmailInput(emailInput),setiserror(false)}}
              borderRadius={30}
              backgroundColor={'#F1F1F5'}
            />
            <View style={{marginTop: 10}}>
              <InputField
                autoCapitalize="none"
                color={'#000'}
                placeholder={'Password'}
                secureTextEntry={!showpass?true:false}
                value={passwordInput}
                onChangeText={passwordInput => {setPasswordInput(passwordInput),setiserror(false)}}
                borderRadius={30}
                backgroundColor={'#F1F1F5'}
                rightIconName={showpass?'eye':'eye-off'}
                righIconOnPress={()=>setshowpass(!showpass)}
              />
                 {iserror?
               <Text style={{color:'red',marginTop:40,alignSelf:'center'}}>
                {errorMessage}
              </Text>
               :null
              }
            </View>
            <Button
              title={'Login'}
              onPress={()=>usersignin()}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 5,
                marginTop: 30,
                borderRadius: 30,
              }}
            />
          </View>

          <TouchableOpacity onPress={()=>props.navigation.navigate('Forgotpassword')} style={styles.forgotview}>
  <ResponsiveText
  style={styles.register}>{'Forgot Password'}
  </ResponsiveText>
</TouchableOpacity>

          <Pressable
            style={styles.haveAccount}
            onPress={() => props.navigation.navigate('Register')}>
            <ResponsiveText
              style={{
                color: '#94959B',
              }}>{`Don't have an account?`}</ResponsiveText>
            <ResponsiveText style={styles.register}>
              {'Register'}
            </ResponsiveText>
          </Pressable>
      
        </View>
      </TouchableWithoutFeedback>
      <Loader loading={Loading} />
    </Container>
  );
};

export default Login;
