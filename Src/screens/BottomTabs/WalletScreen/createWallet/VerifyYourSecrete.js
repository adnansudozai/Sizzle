import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Button,
  Container,
  ResponsiveText,
  Loader,
} from '../../../../components';
import '../../../../../shim';

import styles from './VerifySecretStyles';
import {ethers} from 'ethers';
import Toast from 'react-native-simple-toast';
import {CommonActions} from '@react-navigation/routers';
import {openDatabase} from 'react-native-sqlite-storage';
const VerifyYourSecrete = props => {
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

  const [secratArray, setSecretArray] = useState([]);
  const [secratArrayselected, setSecretArraySelected] = useState([]);
  const [nonShuffle, SetNonShuffle] = useState([]);
  const [secretKey, setSecratKey] = useState(props.route.params.string);
  const [loading, setLoading] = useState(false);
  const [enabled, SetEnabled] = useState(false);
  const [response, setResponse] = useState('');
  const [responsetextColor, setResponceColor] = useState('#F1F1F5');

  useEffect(() => {
    let Array = secretKey.split(' ');
    let ObjArr = [];
    Array.map(async item => {
      await ObjArr.push({title: item});
    });
    SetNonShuffle(props.route.params.secratArray);

    var tempArray = Object.values(props.route.params.secratArray);
    var newArray = tempArray.sort(() => Math.random() - 0.5);

    setSecretArray(newArray);
  }, []);

  const setSecratePharase = async item => {
    var joined = secratArrayselected.concat({
      title: item.item.title,
      key: item.item.key,
    });

    setSecretArraySelected(joined);

    setSecretArray(prevObj => {
      return prevObj.filter(todo => todo.key != item.item.key);
    });

    if (secratArray.length <= 1) {
      if (JSON.stringify(nonShuffle) == JSON.stringify(joined)) {
        setResponceColor('#00D749');
        setResponse('Well Done!');
        SetEnabled(true);
      } else {
        setResponceColor('red');
        setResponse('Invalid Order. Try again');
        SetEnabled(false);
      }
    }
  };

  const RevertSecratePharase = async item => {
    var joined2 = secratArray.concat({
      title: item.item.title,
      key: item.item.key,
    });
    setSecretArray(joined2);

    setSecretArraySelected(prevObj2 => {
      return prevObj2.filter(todo => todo.key != item.item.key);
    });
    setResponceColor('#F1F1F5');
    setResponse('');
  };

  const onSubmit = async () => {
    // SetEnabled(false);
    setLoading(true);
    setTimeout(async () => {
      const newwallet = await ethers.Wallet.fromMnemonic(secretKey);
      console.log('newwallet===>>', newwallet);

      if (newwallet.address) {
        // props.navigation.navigate('Wallet');
        // props.navigation.navigate('TermsofService');
        insertData(newwallet);
      } else {
        setLoading(false);
      }
    }, 50);
  };

  const insertData = newwallet => {
    let generateWallet = newwallet.address;
    let generateprivatekey = newwallet.privateKey;
console.log(generateWallet);
console.log(generateprivatekey);
setLoading(false);
    try {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO tblWallet(name, publicAddress, PrivateKey,chainName,active,scretPharase) VALUES (?,?,?,?,?,?)',
          [
            'Muli-Coin Wallet',
            generateWallet,
            generateprivatekey,
            'Ethereum',
            1,
            secretKey,
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
    }
  };

  const onErrorOccure = () => {};

  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSecratePharase(item);
        }}>
        <View style={styles.itemContainer}>
          <ResponsiveText style={styles.TextPlaceholder}>
            {item.item.title}
          </ResponsiveText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemUpper = (item, index) => {
    return (
      <TouchableOpacity onPress={() => RevertSecratePharase(item)}>
        <View style={styles.itemContainerUpper}>
          <ResponsiveText style={styles.TextPlaceholder}>
            {item.item.title}{' '}
          </ResponsiveText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container backgroundColor={'#fff'}>
      <View style={styles.container}>
        <View style={styles.TopContainer}>
          <View style={{marginVertical: 10, alignSelf: 'center'}}>
            <ResponsiveText style={styles.TextH1}>
              {'Verify Secret Phrase'.toUpperCase()}
            </ResponsiveText>
          </View>
          <View style={styles.TextView}>
            <ResponsiveText style={styles.TextPlaceholderCenter}>
              Tap the words to put them next to each other in the correct order.
            </ResponsiveText>
          </View>
        </View>
        <View style={styles.MiddleContainer}>
          <View
            style={[
              styles.selectedContainer,
              {borderColor: responsetextColor, borderWidth: 1},
            ]}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={secratArrayselected}
              numColumns={4}
              contentContainerStyle={{
                marginLeft: wp(5),
              }}
              renderItem={(item, index) => renderItemUpper(item, index)}
            />
            <Text
              style={{
                fontSize: 10,
                paddingBottom: 15,
                fontWeight: '500',
                color: responsetextColor,
                textAlign: 'center',
              }}>
              {response}
            </Text>
          </View>
          <View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={secratArray}
              numColumns={4}
              contentContainerStyle={{
                marginLeft: wp(5),
              }}
              renderItem={(item, index) => renderItem(item)}
            />
          </View>
        </View>

        <View style={styles.BottomContaner}>
          {enabled ? (
            <Button
              title={'Done'}
              onPress={() => {
                onSubmit();
              }}
              titleStyle={{fontSize: 5}}
              btnContainer={{
                borderRadius: 10,
                marginTop: 30,
                backgroundColor: '#FF0083',
              }}
            />
          ) : (
            <Button
              title={'Done'}
              onPress={onErrorOccure}
              titleStyle={{fontSize: 5}}
              btnContainer={{
                borderRadius: 10,
                marginTop: 30,
                backgroundColor: '#8A8A8A',
              }}
            />
          )}
        </View>
      </View>
      <Loader loading={loading} />
    </Container>
  );
};
export default VerifyYourSecrete;
