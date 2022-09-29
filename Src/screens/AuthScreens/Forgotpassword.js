import React,{useState} from 'react'
import {View,StyleSheet, TouchableWithoutFeedback, Keyboard,Image} from 'react-native';
import {Container, ResponsiveText,Loader, InputField, Button,Images} from '../../components';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { reset_password,new_password } from '../../Api/Api';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
const Forgotpassword=(props)=> {
const [Email,setEmail]=useState('')
const [errorMessage,seterrorMessage]=useState('')
const [token,setToken]=useState('')
const [password,setpassword]=useState('')
const [Loading, setloading] = useState(false);
const [iserror, setiserror] = useState(false);
const [showfield, setshowfield] = useState(false);
const newpassword=async()=>{
  let user={ user:{
    "password": password,
    "reset_password_token": token,
     } }
    if (!Email) {
        seterrorMessage('Enter your email')
        setiserror(true)
    } else {
      setloading(true)
try {
  await new_password(user)
  .then((res) => {
    console.log('responsz====>>',res);
    if(res.status==200){
      setloading(false)
        props.navigation.navigate('DashboardTabNavigator')
  }
    else{
   
      setloading(false)
      setiserror(true)
      seterrorMessage('Invalid Token')

    }
  }).catch((err)=>{
    console.log(err);
  setloading(false)
  setiserror(true)
  seterrorMessage('Invalid Token')

  })
} catch (error) {
  setloading(false)
}
      
        // props.navigation.navigate('DashboardTabNavigator')
    }
    // props.navigation.navigate('DashboardTabNavigator')

}

const Forgetfunction=async()=>{
  let user={ user:{
    "email": Email,
    
     } }
    if (!Email) {
        seterrorMessage('Enter your email')
        setiserror(true)
    } else {
      setloading(true)
try {
  await reset_password(user)
  .then((res) => {
    console.log('responsz====>>',res.status);
    if(res.status==201){
      setloading(false)
      setshowfield(true)
    }
  }).catch((err)=>{
    console.log(err);
  setloading(false)

  })
} catch (error) {
  setloading(false)
}
  
      
        // props.navigation.navigate('DashboardTabNavigator')
    }
    // props.navigation.navigate('DashboardTabNavigator')

}
  return (
   <Container backgroundColor={'white'}>
 <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>

            <View style={styles.logoview}>

            <Image source={Images.splash} style={styles.logo} resizeMode='contain'/>

            </View>
          <ResponsiveText style={styles.emailstyle}>
            {!showfield?'Enter your email address:':'Enter Token & New Password:'}
          </ResponsiveText>
          {!showfield?
          <View style={styles.inputView}>
            <InputField
              autoCapitalize="none"
              color={'#000'}
              placeholder={'Email'}
              value={Email}
              onChangeText={(email)=>{setEmail(email),setiserror(false)}}
              keyboardType="email-address"
  
              borderRadius={30}
              backgroundColor={'#F1F1F5'}
            />
            {iserror?
             <ResponsiveText style={{color:'red',marginTop:10,marginLeft:10}}>
            {errorMessage}
          </ResponsiveText>
:null}
          </View>
          :
          <View style={styles.inputView}>
          <InputField
            autoCapitalize="none"
            color={'#000'}
            placeholder={'Enter Token'}
            value={token}
            onChangeText={(email)=>{setToken(email),setiserror(false)}}
            keyboardType="email-address"

            borderRadius={30}
            backgroundColor={'#F1F1F5'}
          />
          <View style={styles.inputView}>
          <InputField
            autoCapitalize="none"
            color={'#000'}
            placeholder={'New Password'}
            value={password}
            onChangeText={(email)=>{setpassword(email),setiserror(false)}}
            keyboardType="email-address"
            borderRadius={30}
            backgroundColor={'#F1F1F5'}
          />
          </View>
          {iserror?
             <ResponsiveText style={{color:'red',marginTop:10,marginLeft:10}}>
            {errorMessage}
          </ResponsiveText>
:null}
        </View>
}

          <Button
              title={'Contineu'}
              onPress={() => {!showfield?Forgetfunction():newpassword()}}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 5,
                marginTop: hp(20),
                borderRadius: 30,
              }}
            />

       
        </View>
      </TouchableWithoutFeedback>
      <Loader loading={Loading} />

   </Container>
  )
}

const styles = StyleSheet.create({

    mainContainer:{borderWidth:0,marginTop:hp(10),
        marginHorizontal:wp(6),
       
    },
    logoview:{
        borderWidth:0,alignItems:'center'
    },
    logo:{
        width:wp(40),
        height:hp(15)
    },
    emailstyle:{
        color:'black',
        fontSize:6,
        marginTop:hp(10),
        marginLeft:10
    },
    inputView:{
     
    }

})
export default Forgotpassword