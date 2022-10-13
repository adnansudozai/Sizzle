import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Platform} from 'react-native';
import {Container, Images, ResponsiveText} from '../../../../components';
import styles from './styles';

const AlreadyWalletScreen = props => {
  return (
    <Container backgroundColor={'white'}>
      <View style={styles.mainView}>

        <TouchableOpacity
          // onPress={() => props.navigation.navigate('ImportwithPhrase')}
          style={styles.container}>
          <View style={styles.cointermainview}>
            <View style={styles.containersubview}>
              {/* <Image
                source={{
                  uri: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
                }}
                style={styles.imgstyle}
              /> */}
              <View style={styles.cview}>
                <ResponsiveText style={styles.cviewtxt}>
                  {'Multi-Coin Wallet'}
                </ResponsiveText>
                <ResponsiveText style={styles.cviewtxt1}>
                  {'Through seed phrase'}
                </ResponsiveText>
              </View>
            </View>
            <View style={styles.touch}>
              <Image source={Images.rightcolorarrow} style={styles.touchimg} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerchain}
          onPress={() => props.navigation.navigate('ImportwithPhrase',{
            name:'Ethereum'
          })}>
          <View style={styles.cointermainview}>
            <View style={styles.containersubview}>
              <Image
                source={{
                  uri: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
                }}
                style={styles.imgstyle}
                resizeMode='contain'
              />
              <View style={styles.cview}>
                <ResponsiveText style={styles.cviewtxtname}>
                  {'Ethereum'}
                </ResponsiveText>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerchain2}
          //   onPress={() =>
          //     props.navigation.navigate('importwithchain', {
          //       chainname: 'Binance Smart Chain',
          //       rpcurl: 'https://bsc-dataseed.binance.org/',
          //     })
          //   }
        >
          <View style={styles.cointermainview}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ImportwithPhrase',{
                name:'Binance Smart Chain'
              })}>
              <View style={styles.containersubview}>
                <Image
                  source={{
                    uri: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850',
                  }}
                  style={styles.imgstyle}
                />
                <View style={styles.cview}>
                  <ResponsiveText style={styles.cviewtxtname}>
                    {'Binance Smart Chain'}
                  </ResponsiveText>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default AlreadyWalletScreen;
