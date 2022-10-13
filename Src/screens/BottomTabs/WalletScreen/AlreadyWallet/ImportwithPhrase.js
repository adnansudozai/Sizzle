import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Container,
  Images,
  Button,
  ResponsiveText,
  AlertModal,
  Loader,
} from '../../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ethers} from 'ethers';
import Clipboard from '@react-native-clipboard/clipboard';
import {CommonActions} from '@react-navigation/routers';
import {useLinkProps, useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';
const db = openDatabase({name: 'sizzleWallet.db', createFromLocation: 1});

const ImportwithPhrase = props => {
  const navigation = useNavigation();
  const [phrase, setPhrase] = useState('');
  const [name, setname] = useState(props.route.params.name);
  const [loading, setLoading] = useState(false);
  const [accountExisterror, setaccountExisterror] = useState(false);

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
  const onSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      const newwallet = await ethers.Wallet.fromMnemonic(phrase.trim());
      if (newwallet.address) {
        // props.navigation.navigate('Wallet');
        insertData(newwallet);

        setPhrase('');
      } else {
        console.log('else m aya');
      }
    }, 100);
  };

  const insertData = newwallet => {
    let generateWallet = newwallet.address;
    let generateprivatekey = newwallet.privateKey;
console.log(generateWallet);

    try {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO tblWallet(name, publicAddress, PrivateKey,chainName,active,scretPharase) VALUES (?,?,?,?,?,?)',
          [
            name,
            generateWallet,
            generateprivatekey,
            'Ethereum',
            1,
            phrase,
          ],
          (tx, results) => {
            console.log('results=====>>', results, tx);
            if (results.rowsAffected > 0) {
              setLoading(false);
              Toast.show('Created Successfully!');

              props.navigation.navigate('Wallet');
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Wallet',
                      // name: "importprivatekey",
                    },
                  ],
                }),
              );
            } else {
              setLoading(false);
              Toast.show('Please try again latter!');
            }
          },
        );
      });
    } catch (error) {
      console.log('error::::::', error);
      setLoading(false);
    }
  };
  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setPhrase(text);
    setaccountExisterror(false);
  };
  const disablebtn = () => {
    console.log('disable');
  };

  return (
    <Container style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          style={{
            flex: 1,
          }}>
          <View style={styles.TopContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.touchmain}>
              <View style={styles.viewimg}>
                <Image source={Images.leftarrow} style={styles.leftarrow} />
              </View>
              <View style={styles.textmain}>
                <ResponsiveText style={{...styles.viewtxt}}>
                  {'Import Wallet'}
                </ResponsiveText>
              </View>
            </TouchableOpacity>

            <View style={styles.mainview}>
              <ResponsiveText style={{...styles.viewtxt}}>
                {'Name'}
              </ResponsiveText>
              <TextInput
                placeholder={'Enter name'}
                value={name}
                placeholderTextColor={'#8A8A8A'}
                onChangeText={text => {
                  setname(text);
                }}
                style={styles.inputstyle}
              />
            </View>
            <View
              style={{
                marginVertical: 10,
                alignSelf: 'center',
                borderWidth: 0,
                marginTop: hp(3),
                paddingHorizontal: wp(0),
              }}>
              <TextInput
                placeholder={'Seed Phrase'}
                value={phrase}
                autoCapitalize="none"
                placeholderTextColor={'#B6B6B6'}
                onChangeText={text => {
                  setPhrase(text), setaccountExisterror(false);
                }}
                numberOfLines={2}
                multiline={true}
                style={styles.PhraseInput}
              />
            </View>
            <View style={{marginVertical: 10, marginHorizontal: wp(6)}}>
              <ResponsiveText style={styles.TextPlaceholder}>
                Typically 12 words separated by single spaces
              </ResponsiveText>
            </View>

            {accountExisterror == true ? (
              <View style={{marginVertical: 10, marginHorizontal: wp(5)}}>
                <ResponsiveText style={styles.TextError}>
                  {'accounnt alredy exist'}
                </ResponsiveText>
              </View>
            ) : null}
            <TouchableOpacity
              onPress={() => fetchCopiedText()}
              style={styles.copyButton}>
              <ResponsiveText style={styles.copyText}>PASTE</ResponsiveText>
            </TouchableOpacity>
            <View></View>

            {phrase.length != 0 ? (
              <Button
                title={'Import'}
                onPress={() => onSubmit()}
                titleStyle={{fontSize: 5}}
                btnContainer={{
                  borderRadius: 10,
                  marginTop: hp(25),
                }}
              />
            ) : (
              <Button
                title={'Continue'}
                onPress={disablebtn}
                titleStyle={{fontSize: 5}}
                btnContainer={{
                  borderRadius: 10,
                  marginTop: hp(25),
                  backgroundColor: '#EAEAEA',
                }}
              />
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Loader loading={loading} />
    </Container>
  );
};
{/* <AlertModal>
  {'width :10'}
  <Button>
    <view>
      <ResponsiveText>
        text alighn <Image></Image>
      </ResponsiveText>
      <view>
        <ResponsiveText>
          text alighn native
          <ImportwithPhrase></ImportwithPhrase>
        </ResponsiveText>
      </view>
    </view>
  </Button>
</AlertModal> */}

export default ImportwithPhrase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TextH1: {
    fontSize: 5,
    fontWeight: '700',
    color: '#000000',
  },
  TextPlaceholder: {
    fontSize: 4,
    fontWeight: '400',
    color: '#939393',
    paddingLeft: 5,
  },
  TextError: {
    fontSize: 4,
    alignSelf: 'center',
    fontWeight: '500',
    color: 'red',
  },
  ButtonContainer: {
    marginTop: hp(12),
  },
  TopContainer: {
    flex: 1,
    borderColor: 'red',

    paddingBottom: 40,
  },
  MiddleContainer: {
    flex: 0.5,
    borderColor: 'red',
  },
  BottomContaner: {
    flex: 0.3,
    borderColor: 'red',
  },
  itemContainer: {
    backgroundColor: '#F1F1F5',
    borderRadius: 10,
    width: wp(20),
    height: wp(10),
    borderColor: '#DEE3F0',
    borderWidth: 1,
    marginLeft: 7,
    marginTop: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  copyButton: {
    marginTop: wp(5),
    alignSelf: 'center',
    borderColor: '#FF0083',
    borderWidth: 2,
    width: wp(25),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  copyText: {
    fontSize: 4,
    lineHeight: 16,
    fontWeight: '700',
    color: '#FF0083',
  },
  PhraseInput: {
    width: wp(88),
    height: wp(42),
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#F1F1F1',
    borderColor: '#D4D4D4',
    borderRadius: 10,
    textAlignVertical: 'top',
    color: 'black',
  },
  touchmain: {
    borderWidth: 0,
    marginHorizontal: 25,
    flexDirection: 'row',
    marginTop: 20,
  },
  viewimg: {
    alignSelf: 'center',
  },
  leftarrow: {
    height: 24,
    width: 24,
    alignSelf: 'center',
  },
  textmain: {
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 0,
    width: wp(80),
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
  },
  viewtxt: {
    color: 'black',
    fontSize: 6,
    fontWeight: '500',
  },
  inputstyle: {
    marginTop: 10,
    width: wp(88),
    borderWidth: 1,
    padding: 15,
    borderColor: '#D4D4D4',
    borderRadius: 10,
    color: 'black',
    alignSelf: 'center',
  },
  mainview: {
    borderWidth: 0,
    marginHorizontal: wp(5),
    marginTop: hp(5),
    justifyContent: 'center',
  },
});
