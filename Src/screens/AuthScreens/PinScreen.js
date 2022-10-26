import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Container, ResponsiveText, InputField, Button} from '../../components';
import styles from './styles';
import { useDispatch, Provider } from "react-redux";
import { saveuserpin } from '../../redux/actions/userDataAction';
const PinScreen = props => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [errormessage, seterrormessage] = useState('');
  const [error, seterror] = useState(false);
 const dispatch = useDispatch();
  const verifaypin=()=>{
    if(!pin){
      seterrormessage('Please enter a Pin')
      seterror(true)
    }
    else if(!confirmPin){
      seterrormessage('Please Confirm your Pin')
      seterror(true)

    }
    else if(pin!==confirmPin){
      seterrormessage(`Confirm pin does't match`)
      seterror(true)
    
    }
    else{
      dispatch(saveuserpin(pin));
      props.navigation.navigate('DashboardTabNavigator')
    }
   
  }
  const handlepin=(text,pin)=>{
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            alert("please enter numbers only");
        }   
    }
    if(pin=='pin'){
    setPin(newText)
          }
    else{
      setConfirmPin(newText)
    }
  }

  return (
    <Container backgroundColor={'white'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <ResponsiveText style={styles.SetYourPin}>
            {'Set Your Pin'}
          </ResponsiveText>
          <View style={{paddingHorizontal: 25}}>
            <ResponsiveText style={styles.application}>
              {
                'Set your 4 digit PIN, this PIN is used every time you enter the application.'
              }
            </ResponsiveText>
          </View>
          {error&&(
          <View style={styles.errorview}>
          <ResponsiveText style={styles.errormessage}>
            {errormessage}
          </ResponsiveText>
          
          </View>
          )}
          <View style={styles.inputView}>
            <InputField
              autoCapitalize="none"
              placeholder={'PIN'}
              value={pin}
              color={'#000'}
              secureTextEntry={true}
              keyboardType="numeric"
              onChangeText={pin => {handlepin(pin,'pin'),seterror(false)}}
              maxLength={4}
              borderRadius={30}
              backgroundColor={'#F1F1F5'}
            />
            <View style={{marginTop: 10}}>
              <InputField
                autoCapitalize="none"
                placeholder={'PIN Confirmation'}
                value={confirmPin}
                color={'#000'}
                secureTextEntry={true}
                maxLength={4}
                keyboardType='numeric'
                onChangeText={confirmPin => {handlepin(confirmPin,'confirm'),seterror(false)}}
                borderRadius={30}
                backgroundColor={'#F1F1F5'}
              />
            </View>
            <Button
              title={'Continue'}
              onPress={() => verifaypin()}
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
    </Container>
  );
};

export default PinScreen;
