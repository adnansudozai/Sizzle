import React, {useState,useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Container, ResponsiveText, Header} from '../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import {openDatabase} from 'react-native-sqlite-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DepositScreen = props => {
  const [walletAddress, setWalletAddress] = useState();


  useEffect(()=>{
    mywallet()
  },[])
  const db = openDatabase(
    {name: 'sizzleWallet.db', createFromLocation: 1},
    successCB,
    errorCB,
    openCB,
  );

  const errorCB = err => {
    console.log('SQL Error: ' + err);
  };

  const successCB = () => {
    console.log('SQL executed fine');
  };
  const openCB = () => {
    console.log('Database OPENED');
  };
  const mywallet=()=>{
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tblWallet', [], (tx, results) => {
        var temp = [];
         console.log('====================================');
         console.log(results.rows.item(0).publicAddress);
         setWalletAddress(results.rows.item(0).publicAddress)
         console.log('====================================');

      });
    });
  }
  return (
    <Container>
      <Header
        navigation={props.navigation}
        leftIcon={'chevron-left'}
        title={'Deposit'}
        textColor={'#000'}
      />
      <View style={{borderWidth:0,marginHorizontal:20,alignItems:"center",marginTop:10}}>
        <QRCode value={props.route.params.mywalledAddress?props.route.params.mywalledAddress:'Please Create wallet'} size={170} />
        <View
          style={{
            backgroundColor: '#fafafa',
            // paddingVertical: 20,
            width: wp(90),
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 5,
            justifyContent: 'space-around',
          }}>
            {props.route.params.mywalledAddress?
          <ResponsiveText style={{color: '#000',marginTop:10,marginBottom:10}}>
            {`${props.route.params.mywalledAddress.slice(0,25)}.........${props.route.params.mywalledAddress.slice(props.route.params.mywalledAddress.length-5)}`}
          </ResponsiveText>
          :null}
          {props.route.params.mywalledAddress?
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(props.route.params.mywalledAddress),
                Toast.show('Copied!', Toast.LONG);
            }}>
            <Icon name="content-copy" size={20} color="#000" />
          </TouchableOpacity>
          :null}
        </View>
      </View>
      <View style={{paddingHorizontal: wp(7),marginTop:hp(3)}}>
        <ResponsiveText
          style={{
            color: '#000',
            fontSize: 5,
            fontWeight: '600',
          }}>
          {'Payment Instructions:'}
        </ResponsiveText>
        <ResponsiveText style={styles.TextStyle}>
          {'1:On main menu, choose Other Transactions.'}
        </ResponsiveText>
        <ResponsiveText style={styles.TextStyle}>
          {'2:Choose Payment Transfer.'}
        </ResponsiveText>
        <ResponsiveText style={styles.TextStyle}>
          {'3:Choose Others.'}
        </ResponsiveText>
        <ResponsiveText style={styles.TextStyle}>
          {'4:Choose Virtual Account Payment.'}
        </ResponsiveText>
        <ResponsiveText style={styles.TextStyle}>
          {'5:Insert your Virtual Account Number and proceed.'}
        </ResponsiveText>
        <ResponsiveText style={styles.TextStyle}>
          {
            '6:On the confirmation page, there will be the amount to pay. If the information is already correct, proceed.'
          }
        </ResponsiveText>

        <ResponsiveText style={styles.TextStyle}>
          {'7:Choose your source of payment and proceed.'}
        </ResponsiveText>
        <ResponsiveText style={styles.TextStyle}>
          {'8:Your transaction is completed.'}
        </ResponsiveText>
      </View>
    </Container>
  );
};

export default DepositScreen;

const styles = StyleSheet.create({
  TextStyle: {
    color: '#000',
    fontSize: 4,
    marginTop: 10,
  },
});
