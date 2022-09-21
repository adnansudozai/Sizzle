import React,{useState} from 'react'
import {View,StyleSheet, TouchableWithoutFeedback, Keyboard,Image} from 'react-native';
import {Container, ResponsiveText, InputField, Button,Images} from '../../components';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const Forgotpassword=(props)=> {
const [Email,setEmail]=useState('')
const [errorMessage,seterrorMessage]=useState('')
const Forgetfunction=()=>{
    if (!Email) {
        seterrorMessage('Enter your email')
    } else {
        props.navigation.navigate('DashboardTabNavigator')
    }
    props.navigation.navigate('DashboardTabNavigator')

}
  return (
   <Container backgroundColor={'white'}>
 <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>

            <View style={styles.logoview}>

            <Image source={Images.splash} style={styles.logo} resizeMode='contain'/>

            </View>
          <ResponsiveText style={styles.emailstyle}>
            {'Enter your email address:'}
          </ResponsiveText>
          <View style={styles.inputView}>
            <InputField
              autoCapitalize="none"
              color={'#000'}
              placeholder={'Email'}
              value={Email}
              onChangeText={(email)=>setEmail(email)}
              keyboardType="email-address"
  
              borderRadius={30}
              backgroundColor={'#F1F1F5'}
            />
            
            <Button
              title={'Contineu'}
              onPress={() => Forgetfunction()}
              titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 5,
                marginTop: hp(20),
                borderRadius: 30,
              }}
            />
          </View>

         

       
        </View>
      </TouchableWithoutFeedback>
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