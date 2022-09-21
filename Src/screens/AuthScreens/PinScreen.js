import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Container, ResponsiveText, InputField, Button} from '../../components';
import styles from './styles';

const PinScreen = props => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [errormessage, seterrormessage] = useState('');
  const verifaypin=()=>{
    if(!pin){
      seterrormessage('Please enter a Pin')
    }
    else if(!confirmPin){
      seterrormessage('Please Confirm your Pin')

    }
    else if(pin!==confirmPin){
      seterrormessage(`Confirm pin does't match`)
    
    }
    else{
      props.navigation.navigate('DashboardTabNavigator')
    }
    props.navigation.navigate('DashboardTabNavigator')
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
                'Set your PIN, this PIN is used every time you enter the application.'
              }
            </ResponsiveText>
          </View>
          {errormessage!=''&&(
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
              onChangeText={pin => setPin(pin)}
              maxLength={6}
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
                maxLength={6}
                keyboardType="numeric"
                onChangeText={confirmPin => setConfirmPin(confirmPin)}
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
            <View>
              <Button
                title={'Skip'}
                onPress={() => console.log('login Press')}
                titleStyle={{fontSize: 4.5, color: '#000'}}
                btnContainer={{
                  borderRadius: 5,
                  marginTop: 30,
                  borderRadius: 30,

                  backgroundColor: '#F1F1F5',
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default PinScreen;