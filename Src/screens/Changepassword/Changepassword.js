import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text
} from 'react-native';
import {Container, ResponsiveText,Loader, InputField, Button} from '../../components';
import styles from './styles';
import {change_password } from '../../Api/Api';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';

const Changepassword =(props) => {
    const [confirmpasswordInput, setconfirmpasswordInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
  const [showpass, setshowpass] = useState(false);
  const [showconfpass, setshowconfpass] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [iserror, setiserror] = useState(false);
  const [Loading, setloading] = useState(false);

  let data=useSelector(state => state.userdataReducer)

const changepass=async()=>{
    if (!passwordInput) {
        setiserror(true)
        seterrorMessage('Enter Password')
    }
    else if (!confirmpasswordInput) {
        seterrorMessage('Enter confirm Password')
        setiserror(true)

    }
    else if (passwordInput!=confirmpasswordInput) {
        seterrorMessage(`Password can't match`)
        setiserror(true)

    }
    
    else {
try {
    const formData = new FormData();
    formData.append("user[password]", passwordInput);
    formData.append("user[password_confirmation]", confirmpasswordInput);
    setloading(true)
    await change_password(formData,data.barerToken)
.then((res) => {
    console.log('res====',res);
if(res.status==201){
    setloading(false)
    props.navigation.navigate('DashboardTabNavigator')
    Toast.show('Password Change!', Toast.LONG);
}
else{

    setloading(false)

}


})

} catch (error) {
    console.log('catch error',error);
    setloading(false)

}

      
        
    }

}
  return (
    <Container backgroundColor={'white'}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.mainContainer]}>
        <ResponsiveText style={styles.loginAccount}>
          {'Change Password'}
        </ResponsiveText>
        <View style={styles.inputView}>
        <InputField
              autoCapitalize="none"
              color={'#000'}
              placeholder={'New Password'}
              secureTextEntry={!showpass?true:false}
              value={confirmpasswordInput}
              onChangeText={passwordInput => {setconfirmpasswordInput(passwordInput),setiserror(false)}}
              borderRadius={30}
              backgroundColor={'#F1F1F5'}
              rightIconName={showpass?'eye':'eye-off'}
              righIconOnPress={()=>setshowpass(!showpass)}
            />
          <View style={{marginTop: 10}}>
           
              <InputField
            autoCapitalize="none"
            color={'#000'}
            value={passwordInput}
            placeholder={'Confirm new Password'}
            secureTextEntry={!showconfpass?true:false}
       
        onChangeText={emailInput => {setPasswordInput(emailInput), setiserror(false)}}
            borderRadius={30}
            backgroundColor={'#F1F1F5'}
            rightIconName={showconfpass?'eye':'eye-off'}
            righIconOnPress={()=>setshowconfpass(!showconfpass)}
          />
               {iserror?
             <Text style={{color:'red',marginTop:40,alignSelf:'center'}}>
              {errorMessage}
            </Text>
             :null
            }
          </View>
        
        </View>

        <View style={{position:"absolute",bottom:'10%',alignSelf:"center",alignItems:'center'}}>
          <Button
            title={'Change Password'}
            onPress={()=>changepass()}
            titleStyle={{fontSize: 4.5}}
            btnContainer={{
              borderRadius: 5,
              borderRadius: 30,
        
            }}
          />
          </View>
    
      </View>
     
    </TouchableWithoutFeedback>
    <Loader loading={Loading} />
  </Container>
  )
}

export default Changepassword

