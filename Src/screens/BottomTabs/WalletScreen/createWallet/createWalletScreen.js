import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  Container,
  ResponsiveText,
  Button,
  Images,
} from '../../../../components';
import styles from './styles';

import {openDatabase} from 'react-native-sqlite-storage';

const createWalletScreen = props => {
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
  useEffect(() => {
    db.transaction(tx => {
      console.log('tx====>>', tx);
      tx.executeSql('SELECT * FROM tblWallet', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        console.log('temp====>>', temp);
       
      });
    });
  }, []);
  return (
    <Container backgroundColor={'white'}>
      <View style={styles.mainContainer}>
        <View
          style={{
            paddingHorizontal: wp(10),
            justifyContent: 'center',
            marginTop: hp(5),
          }}>
          <ResponsiveText
            style={{
              color: '#FC4070',
              fontSize: 6,
              marginTop: hp(2),
              alignSelf: 'center',
            }}>
            {'Sizzle Wallet!'}
          </ResponsiveText>
          <View
            style={{alignSelf: 'center', flexDirection: 'row', marginTop: 15}}>
            <ResponsiveText style={{color: '#000', fontSize: 5}}>
              {'The Crypto Wallet for'}
            </ResponsiveText>
            <ResponsiveText style={{color: '#FC4070', fontSize: 5}}>
              {' Everyone'}
            </ResponsiveText>
          </View>
          <View>
            <Image
              source={Images.createWalletImage}
              style={{
                width: wp(85),
                height: hp(50),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </View>
          <View style={{marginTop: hp(6)}}>
            <Button
              title={'Create your wallet'}
              titleStyle={{fontSize: 4}}
              onPress={() => props.navigation.navigate('YourSecretPharase')}
              btnContainer={{width: wp(85)}}
            />
            <Button
              onPress={() => {
                props.navigation.navigate('ImportwithPhrase',{
                  name:'Multi Chain'
                });
              }}
              title={'Already have a wallet'}
              titleStyle={{fontSize: 4, color: '#000'}}
              btnContainer={{backgroundColor: '#fff'}}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default createWalletScreen;
