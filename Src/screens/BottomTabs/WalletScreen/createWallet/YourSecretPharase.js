import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import styles from './secretePharaseStyles';
import 'react-native-get-random-values';
import {Button, Container, ResponsiveText} from '../../../../components';
import {ethers} from 'ethers';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';

const YourSecretPharase = props => {
  const [loading, setLoading] = useState(false);
  const [scretstring, setSecretString] = useState(
    'snake wrong brass orbit wild flip lyrics walnut emerge stone avoid actor',
  );
  const [secratArray, setSecretArray] = useState([]);
  const [secretArrayShuffled, setSecretArrayShuffled] = useState([]);

  useEffect(() => {
    createWallet();
  }, []);

  const createWallet = () => {
    try {
      let some = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
      setSecretString(some);
      if (secratArray.length < 1) {
        let Array = some.split(' ');
        let ObjArr = [];
        Array.map(async item => {
          await ObjArr.push({
            title: item,
            key: Math.random() + 1,
          });
        });
        setSecretArrayShuffled(ObjArr);
        setSecretArray(ObjArr);
      }
    } catch (err) {
      console.log('err===>>>', err);
    }
  };
  
  const copyhandle = () => {
    Clipboard.setString(scretstring);

    Toast.show('Copied.');
  };

  console.log('scretstring::::', scretstring);
  const renderItem = item => {
    return (
      <View style={styles.itemContainer}>
        <ResponsiveText style={styles.TextPlaceholder}>
          {item.item.title.toLowerCase()}
        </ResponsiveText>
      </View>
    );
  };

  const onSubmit = () => {
    props.navigation.navigate('VerifyYourSecrete', {
      string: scretstring,
      secratArray: secratArray,
      shuffleArray: secretArrayShuffled,
    });
  };

  return (
    <Container backgroundColor={'#fff'}>
      <ScrollView>
        <View style={styles.conntainer}>
          <View style={styles.secratePharase}>
            <View style={styles.TopContainer}>
              <View
                style={{
                  marginVertical: 1,
                  alignSelf: 'center',
                  borderWidth: 0,
                  marginTop: '20%',
                }}>
                <ResponsiveText style={styles.TextH1}>
                  {'Your Secret Phrase'.toUpperCase()}
                </ResponsiveText>
              </View>
              <View
                style={{
                  marginVertical: 8,
                  alignSelf: 'center',
                  marginHorizontal: 40,
                }}>
                <ResponsiveText style={styles.TextPlaceholderCenter}>
                  Write down or copy these words in the right order and save
                  them somewhere safe.
                </ResponsiveText>
              </View>
            </View>
            <View style={styles.MiddleContainer}>
              <View>
                <FlatList
                  data={secratArray}
                  numColumns={4}
                  renderItem={item => renderItem(item)}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => copyhandle()}
                  style={styles.copyButton}>
                  <ResponsiveText style={styles.copyText}>Copy</ResponsiveText>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.BottomContaner}>
              <View style={styles.warningContainer}>
                <ResponsiveText style={styles.WarningText}>
                  DO NOT SHARE YOUR SECRET PHRASE
                </ResponsiveText>
                <ResponsiveText style={styles.warningSubText}>
                  If someone has your secret phrase, they will have full control
                  of your wallet.
                </ResponsiveText>
              </View>

              <Button
                title={'Continue'}
                onPress={onSubmit}
                titleStyle={{fontSize: 4.5}}
                btnContainer={{
                  borderRadius: 10,
                  marginTop: 30,
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default YourSecretPharase;
