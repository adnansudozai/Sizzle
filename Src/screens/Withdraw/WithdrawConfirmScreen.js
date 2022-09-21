import React,{useState} from 'react';
import {View, Image, Text} from 'react-native';
import {
  Container,
  ResponsiveText,
  Header,
  GradientButton,
  Button,
  Loader
} from '../../components';
import styles from './styles';
import '../../../shim';
import {DATA} from './dummyArray';
import Web3 from 'web3';
import {CommonActions} from '@react-navigation/routers';

const WithdrawConfirmScreen = props => {

  const [loading, setLoading] = useState(false);



    //////////send coins=====>>>>>

    const sendCoins = async () => {
      try {
        setLoading(true)
        let web3 = new Web3(props.route.params.item.rpcUrl);
        const newwallet = web3.eth.accounts.privateKeyToAccount(
          props.route.params.privateKey,
        );
        web3.eth.accounts.wallet.add(newwallet);
        var gasPrice = await web3.eth.getGasPrice();
  
        gasPrice = parseInt(gasPrice) + 4000000000;
  
        var txFee = gasPrice * 21000;
  
        if (props.route.params.amount == props.route.params.item.balance) {
          var gasLimit = 21000;
          let getVlue =
            web3.utils.toWei(props.route.params.amount, 'ether') - txFee;
  
          const contract = await web3.eth
            .sendTransaction({
              from: props.route.params.mywalledAddress,
              to: props.route.params.waletaddress,
              value: getVlue,
              gasPrice: gasPrice,
              gas: gasLimit,
            })
            .on('transactionHash', trxHash => {
              console.log('trxHash', trxHash);
              if (trxHash) {
        setLoading(false)
             
              
                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'DashboardTabNavigator',
                      },
                    ],
                  }),
                );
              }
            });
  
      
        } else {
          console.log('else m aya', props.route.params.amount);
          var gasLimit = 21000;
          // let transFee = gasPrice * 21000;
  
          let newAmount = Number(props.route.params.amount).toFixed(10);
  
          console.log('newAmount===', newAmount);
          const contract = await web3.eth
            .sendTransaction({
              from: props.route.params.mywalledAddress,
              to: props.route.params.waletaddress,
              value: web3.utils.toWei(newAmount.toString(), 'ether'),
              gasPrice: gasPrice,
              gas: gasLimit,
            })
            .on('transactionHash', trxHash => {
              console.log('trxHash', trxHash);
              if (trxHash) {
                setLoading(false)

                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'DashboardTabNavigator',
                      },
                    ],
                  }),
                );
              }
            });
        }
      } catch (error) {
        console.log('error', error);
        if (error.message) {
          setErrormessage(true);
        setLoading(false)

        }
        // setLoading(false);
      }
      // setLoading(false)
    };
  
  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        leftIcon={'chevron-left'}
        title={'Withdraw'}
        textColor={'#000'}
      />
      <View style={[styles.mainContainer]}>
        <View>
          <ResponsiveText style={styles.withdrawInfoBanner}>
            {`Withdrawal money into the account will take about 3 minutes, thank you.`}
          </ResponsiveText>
        </View>
        <View style={styles.inputView}>
          <View style={styles.displayDataView}>
            <ResponsiveText style={styles.dataLabel}>{`Coin:`}</ResponsiveText>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={DATA[0].image} style={styles.listImage} />
                <Text style={styles.symbolTxt}>{props.route.params.item.symbol?props.route.params.item.symbol:null}</Text>
              </View>
            </View>
          </View>
          {props.route.params.waletaddress?
          <View style={styles.displayDataView}>
            <ResponsiveText
              style={styles.dataLabel}>{`Address:`}</ResponsiveText>
          
            <View>
              <ResponsiveText
                style={styles.inputLabel}>{`${props.route.params.waletaddress.slice(0,6)}....${props.route.params.waletaddress.slice(props.route.params.waletaddress.length-4)}`}</ResponsiveText>
            </View>
          </View>
          :null}
          {props.route.params.item.tokenName?
          <View style={styles.displayDataView}>
            <ResponsiveText
              style={styles.dataLabel}>{`Network :`}</ResponsiveText>
            <View>
              <ResponsiveText
                style={styles.inputLabel}>{`${props.route.params.item.tokenName}`}</ResponsiveText>
            </View>
          </View>
          :null}
          {props.route.params.item.symbol?
          <View style={styles.displayDataView}>
            <ResponsiveText
              style={styles.dataLabel}>{`Amount:`}</ResponsiveText>
            <View>
              <ResponsiveText
                style={styles.inputLabel}>{`${props.route.params.amount} ${props.route.params.item.symbol}`}</ResponsiveText>
            </View>
          </View>
          :null}
          {/* <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <ResponsiveText
              style={styles.dataLabel}>{`Receive Amount:`}</ResponsiveText>
            <View>
              <ResponsiveText
                style={{
                  fontWeight: 'bold',
                  color: '#1F1F1F',
                  marginRight: 5,
                  fontSize: 3.5,
                  textAlign: 'right',
                }}>{`0.995000 BNB`}</ResponsiveText>
              <ResponsiveText
                style={{
                  color: '#929292',
                  fontSize: 3.5,
                }}>{`0.005 BNB Network fee`}</ResponsiveText>
            </View>
          </View> */}
          {!loading?
          <GradientButton
            onPress={() => sendCoins()}
            title={'Withdraw'}
            titleStyle={{fontSize: 4.5}}
            btnContainer={{
              borderRadius: 15,
              marginTop: 90,
            }}
            gradientColor={['#163272', '#4674c3']}
            shadowColor="#BCC9E4"
          />
:null}
          <Button
            title={'Cancel'}
            onPress={() => props.navigation.navigate('Home')}
            titleStyle={{fontSize: 4.5, color: '#000'}}
            btnContainer={{
              borderRadius: 15,
              marginTop: 30,
              backgroundColor: '#F1F1F5',
            }}
          />
        </View>
      </View>
      <Loader loading={loading} />

    </Container>
  );
};

export default WithdrawConfirmScreen;
