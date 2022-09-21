import React, { useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Text,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  ResponsiveText,
  Header,
  InputField,
  GradientButton,
  Select,
  Images
} from '../../components';
import styles from './styles';
import { DATA, networkDATA } from './dummyArray';

const coinView = (item, selected) => {
  return (
    <View
      style={[
        styles.optionContainer,
        {
          backgroundColor: item.tokenName === selected?.tokenName ? '#F1F1F5' : '#fff',
        },
      ]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={item.tokenName=="Ethereum"?Images.ethereum:Images.bnblogo} style={styles.listImage} />
        <Text style={styles.symbolTxt}>{item.symbol}</Text>
        <Text style={styles.nameTxt}>{item.tokenName}</Text>
      </View>
      {item.tokenName === selected?.tokenName && (
        <Icon name={'check'} size={25} color={'green'} />
      )}
    </View>
  );
};

const selectedCoinView = selected => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={selected.tokenName=="Ethereum"?Images.ethereum:Images.bnblogo} style={styles.listImage} />
      <Text style={styles.symbolTxt}>{selected.symbol}</Text>
      <Text style={styles.nameTxt}>{selected.tokenName}</Text>
    </View>
  );
};
const networkView = (item, selected) => {
  return (
    <View
      style={[
        styles.optionContainer,
        {
          backgroundColor: item.name === selected?.name ? '#F1F1F5' : '#fff',
        },
      ]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.symbolTxt, { marginLeft: 10 }]}>{item.Symbol}</Text>
        <Text style={styles.nameTxt}>{item.name}</Text>
      </View>
      {item.name === selected?.name && (
        <Icon name={'check'} size={25} color={'green'} />
      )}
    </View>
  );
};

const selectedNetworkView = selected => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={[styles.symbolTxt, { marginLeft: 10 }]}>
        {selected.Symbol}
      </Text>
      <Text style={styles.nameTxt}>{selected.name}</Text>
    </View>
  );
};

const WithdrawScreen = props => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [addressInput, setAddressInput] = useState('');
  const [selectedNetowrk, setSelectedNetwork] = useState(null);
  const [amountInput, setAmountInput] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [errormesage, seterrormesage] = useState(false);


const ammounthandle=(text)=>{
  setAmountInput(text);
  if (text>= selectedCoin.balance) {
    seterrormesage(true);
  } else {
    seterrormesage(false);
  }

}
  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        leftIcon={'chevron-left'}
        title={'Withdraw'}
        textColor={'#000'}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.mainContainer]}>
          <View style={styles.inputView}>
            <View style={{ marginTop: 30 }}>
              <ResponsiveText
                style={styles.inputLabel}>{`Coin:`}</ResponsiveText>
              <Select
                placeholder={'select coin'}
                options={props.route.params.myassets}
                onChangeSelect={item => {seterrormesage(false),setSelectedCoin(item)}}
                marginTop={15}
                optionItemView={coinView}
                selectedItemView={selectedCoinView}
              />
            </View>
            <View style={{ marginTop: 30 }}>
              <ResponsiveText
                style={styles.inputLabel}>{`Address:`}</ResponsiveText>
              <InputField
                autoCapitalize="none"
                color={'#000'}
                placeholder={'Enter the address'}
                value={addressInput}
                keyboardType="email-address"
                onChangeText={addressInput => setAddressInput(addressInput)}
                backgroundColor={'#F1F1F5'}
                marginTop={15}
              />
            </View>
            {/* <View style={{ marginTop: 30 }}>
              <ResponsiveText
                style={styles.inputLabel}>{`Network:`}</ResponsiveText>
              <Select
                placeholder={'select network'}
                options={networkDATA}
                onChangeSelect={item => setSelectedNetwork(item)}
                marginTop={15}
                optionItemView={networkView}
                selectedItemView={selectedNetworkView}
              />
            </View> */}
            {selectedCoin?
            <View style={{ marginTop: 30 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <ResponsiveText
                  style={styles.inputLabel}>{`Amount:`}</ResponsiveText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ResponsiveText
                    style={{
                      fontWeight: 'bold',
                      color: '#1F1F1F',
                      marginRight: 5,
                      fontSize: 3.5,
                    }}>{`${selectedCoin.balance} ${selectedCoin.symbol}`}</ResponsiveText>
                  <ResponsiveText
                    style={{
                      color: '#929292',
                      fontSize: 3.5,
                    }}>{`available`}</ResponsiveText>
                </View>
              </View>
              <InputField
                autoCapitalize="none"
                color={'#000'}
                placeholder={'Enter the Amount'}
                value={amountInput}
                keyboardType="decimal-pad"
                onChangeText={amountInput => ammounthandle(amountInput)}
                backgroundColor={'#F1F1F5'}
                marginTop={15}
                RightButton={
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginRight: 10,
                    }}>
                    <Pressable onPress={() => setSelectedCurrency('Max')}>
                      <ResponsiveText
                        style={{
                          color: selectedCurrency === 'Max' ? '#4674c3' : null,
                        }}>
                        {'Max'}
                      </ResponsiveText>
                    </Pressable>
                    <ResponsiveText>{' | '}</ResponsiveText>
                    <Pressable onPress={() => setSelectedCurrency('BNB')}>
                      <ResponsiveText
                        style={{
                          color: selectedCurrency === 'BNB' ? '#4674c3' : null,
                        }}>
                        {'BNB'}
                      </ResponsiveText>
                    </Pressable>
                  </View>
                }
              />
            </View>
:null}
{errormesage?
<View style={{marginTop:10,}}>
<ResponsiveText
                    style={{
                      color: 'red',
                      fontSize: 3,
                    }}>{`Unavailable Balance`}</ResponsiveText>
</View>
:null}

{amountInput!=0 && !errormesage && addressInput!=''?
            <GradientButton
              onPress={() => props.navigation.navigate('WithdrawConfirm',{
                item:selectedCoin,
                privateKey:props.route.params.privateKey,
                mywalledAddress:props.route.params.mywalledAddress,
                waletaddress:addressInput,
                amount:amountInput
              })}
              title={'Continue'}
              titleStyle={{ fontSize: 4.5 }}
              btnContainer={{
                borderRadius: 15,
                marginTop: 80,
              }}
              gradientColor={['#163272', '#4674c3']}
              shadowColor="#BCC9E4"
            />
:null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default WithdrawScreen;
