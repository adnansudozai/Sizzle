import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Container,
  Images,
  Button,
  ERC20,
  ResponsiveText,
  AlertModal,
  Header
} from '../../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import {openDatabase} from 'react-native-sqlite-storage';
import Web3 from 'web3';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ScrollView} from 'react-native-virtualized-view';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomToken = props => {
  const refRBSheet = useRef();
  const [loading, setLoading] = useState(false);
  const [tabview, settabview] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalsubTitle, setModalsubTitle] = useState('');

  const [adreserror, setadreserror] = useState(false);
  const [symbolerror, setsymbolerror] = useState(false);
  const [decimalerror, setdecimalerror] = useState(false);

  const [value, setValue] = useState('Ethereum');

  // add custom token
  const [btnDisable, setBtnDisable] = useState(true);
  const [addressErrorMsg, setAddressErrorMsg] = useState('');
  const [symbol, setSymbol] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenlogo, settokenlogo] = useState('');

  const [decimal, setDecimal] = useState('');
  const [address, setAddress] = useState('');
  const [tokens, setTokens] = useState([]);

  const [rpcUrl, setRpcUrl] = useState(
    'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  );
  const [selectedWalletId, setSelectedWalletID] = useState('');

  const array = [
    {
      id: 1,
      name: 'Ethereum',
      iconscur:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
      mainNetRpc:
        'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    },
    {
      id: 2,
      name: 'Binance smart chain',
      iconscur:
        'https://w7.pngwing.com/pngs/997/942/png-transparent-bnb-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment-icon-thumbnail.png',
      mainNetRpc: 'https://bsc-dataseed.binance.org/',
    },
   
  ];

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
  const web3 = new Web3(rpcUrl);

  useEffect(() => {
    GetWallet('Ethereum');
  }, []);
  

  const getimage = async name => {
    console.log(name);
    let str = name.includes('BNB')
      ? 'binancecoin'
      : name.includes('Tether Gold')
      ? 'Tether Gold'
      : name.includes('PancakeSwap')
      ? 'PancakeSwap Token'
      : name.includes('Matic')
      ? 'matic-network'
      : name.includes('BUSD Token')
      ? 'Binance USD'
      : name.includes('Cardano Token')
      ? 'Cardano'
      : name.includes('Compound Dai')
      ? 'cdai'
      : name.includes('Wrapped Bitcoin')
      ? 'Wrapped Bitcoin'
      : name.includes('Shiba Inu')
      ? 'SHIBA INU'
      : name.includes('Lido DAO Token')
      ? 'Lido DAO'
      : name.includes('Avalanche')
      ? 'avalanche-2'
      : name.includes('CRO')
      ? 'crypto-com-chain'
      : name.includes('ChainLink')
      ? 'ChainLink'
      : name.includes('Stellerro token')
      ? 'stellar'
      : name.includes('NEAR Protocol')
      ? 'NEAR'
      : name.includes('Bitcoin Cash Token')
      ? 'Binance-Peg Bitcoin Cash'
      : name.includes('VeChain Token')
      ? 'VeChain'
      : name.includes('Flowchain')
      ? 'flowchaincoin'
      : name.includes('Decentraland MANA')
      ? 'Decentraland'
      : name.includes('TrueUSD')
      ? 'True USD'
      : name.includes('Axie Infinity Shard')
      ? 'Axie Infinity'
      : name.includes('KuCoin Token')
      ? 'kucoin-shares'
      : name.includes('BITCOIN SV')
      ? 'bitcoin-cash-sv'
      : name.includes('Elrond')
      ? 'elrond-erd-2'
      : name.includes('EOS Token')
      ? 'EOS'
      : name.includes('Pax Dollar')
      ? 'paxos-standard'
      : name.includes('HuobiToken')
      ? 'Huobi Token'
      : name.includes('Aave Token')
      ? 'Aave'
      : name.includes('Zcash Token')
      ? 'Zcash'
      : name.includes('Neutrino USD')
      ? 'Neutrino'
      : name.includes('MIOTAC')
      ? 'iota'
      : name.includes('Klaytn')
      ? 'klay-token'
      : name.includes('Quant')
      ? 'quant-network'
      : name.includes('GATE')
      ? 'gatechain-token'
      : name.includes('Dai')
      ? 'Dai'
      : name.includes('Fantom Token')
      ? 'Fantom'
      : name.includes('THORChain ETH.RUNE')
      ? 'thorchain-erc20'
      : name.includes('Zilliqa (PoS)')
      ? 'zilliqa'
      : name.includes('pTokens GALA')
      ? 'GALA'
      : name.includes('LoopringCoin V2')
      ? 'loopringcoin-v2-wormhole'
      : name.includes('Wrapped DASH')
      ? 'Dash Diamond'
      : name.includes('Tether')
      ? 'tether'
      : name.includes('Amp')
      ? 'amp-token'
      : name.includes('Synthetix Network Token')
      ? 'havven'
      : name.includes('Green Metaverse Token')
      ? 'stepn'
      : name.includes('XinFin XDCE')
      ? 'xdce-crowd-sale'
      : name.includes('Digix Gold Token')
      ? 'digix-gold'
      : name.includes('QANX Token')
      ? 'qanplatform'
      : name.includes('Wrapped ZYX')
      ? 'ZYX'
      : name.includes('ZooToken')
      ? 'zoo-token'
      : name.includes('flexUSD')
      ? 'flex USD'
      : name.includes('StakeWise Staked ETH2')
      ? 'stakewise-staked-gno'
      : name.includes('Dola USD Stablecoin')
      ? 'dola-usd'
      : name.includes('Injective Token')
      ? 'injective-protocol'
      : name.includes('MoonRetriever')
      ? 'moonretriever'
      : name;

    str = str.split(' ').join('-');
    let id = str.toLowerCase();
    console.log('idddd is tokennnnnnn', id);
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    console.log('logoooooooooo',res.data.image.small);
  
    settokenlogo(res.data.image.small);
  };

  const GetWallet = cahinName => {
   
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tblWallet', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i){
          temp.push(results.rows.item(i));
        console.log('results.rows.item(i)',results.rows.item(i));
        setSelectedWalletID(results.rows.item(0).id);
        
        }
       

        GetTokens(results.rows.item(0).id, cahinName);
      });
    });
  };

  const GetTokens = (id, cahinName) => {
console.log('calll=====',id);
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM tblToken where walletId=${id} AND chainName=?`,
        [cahinName],
        (tx, results) => {
            console.log('FOUND=>>>>>TOKEN', results.rows.item(0));
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i){
            temp.push(results.rows.item(i));
        

          console.log('FOUND=>>>>>TOKEN', results.rows.item(i));
        }
          setTokens(temp);
        },
      );
    });
  };

  const ImportToken = async text => {
    console.log('text===', text);
    if (text.length > 7) {
      ImportSmartChainToken(text);
    }
  };
  const ImportSmartChainToken = async text => {
    try {
      const validAddress = web3.utils.isAddress(text);
      console.log('reasult iss.f,d,f.', validAddress);

      if (validAddress == true) {
        if (tokens.length < 1) {
          setAddressErrorMsg('');
        
          console.log('reasult', validAddress);

          const tokenContract = new web3.eth.Contract(ERC20, text);
          console.log('tokenContract',tokenContract);
          const symbol = await tokenContract.methods.symbol().call();
          const decimals = await tokenContract.methods.decimals().call();
          const name = await tokenContract.methods.name().call();
          console.log('name111', name);
          setTokenName(name);
          setSymbol(symbol);
          setDecimal(decimals);
          getimage(name);
          setBtnDisable(false);
        } else {
          const result = tokens.find(name => name.tokenAddress === text);
          console.log('result========>>.', result);
          if (result != undefined || result != null) {
            setSymbol('');
            setDecimal('');
            setAddressErrorMsg(`Token already exist on ${value} chain`);
            setBtnDisable(true);
          } else {
            setAddressErrorMsg('');
            const tokenContract = new web3.eth.Contract(ERC20, text);
            const symbol = await tokenContract.methods.symbol().call();
            const decimals = await tokenContract.methods.decimals().call();
            const name = await tokenContract.methods.name().call();
            console.log('name222', name);
            setTokenName(name);

            setSymbol(symbol);
            setDecimal(decimals);
            getimage(name);
            setBtnDisable(false);

          }
        }
      } else {
        setSymbol('');
        setDecimal('');
        setBtnDisable(true);
        setAddressErrorMsg('Invalid address');
      }
    } catch (error) {
      let text = error.message;
      let result = text.includes("Returned values aren't valid,");
      if (result == true) {
        setBtnDisable(true);
        setAddressErrorMsg(
          'This address does not correspond to a token on the selected chain',
        );
      }
    }
  };

  const onSubmit = () => {
    if (!address) {
      setadreserror(true);
    } else if (!symbol) {
      setsymbolerror(true);
    } else if (!decimal) {
      setdecimalerror(true);
    } else {
      // TODO
      db.transaction(function (tx) {
        console.log(tokenlogo);
        tx.executeSql(
          'INSERT INTO tblToken(tokenName, symbol, decimals,active,contractAbi,chainName, walletId,tokenAddress,type,rpcUrl,rpcUrlname,tokenlogo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
          [
            tokenName,
            symbol,
            decimal,
            1,
            null,
            value,
            selectedWalletId,
            address,
            'token',
            rpcUrl,
            value,
            tokenlogo,
          ],
          (tx, results) => {
            console.log('Results', results);
            if (results.rowsAffected > 0) {
              // setShowAlert(true);
              props.navigation.navigate('Wallet');
              setBtnDisable(true);
              console.log('value of token =====>>', value);
              GetWallet(value);
            } else {
              console.log('add token request failed!');
            }
          },
        );
      });
      setAddress('');
      setDecimal('');
      setSymbol('');
    }
  };

  // TODO:
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
          GetWallet(item.name),
            setValue(item.name),
            setRpcUrl(item.mainNetRpc),
            setAddress(''),
            setDecimal(''),
            setSymbol(''),
            setTokenName(''),
            setAddressErrorMsg(''),
            refRBSheet.current.close();
            
        
      }}
      style={{
        paddingHorizontal: wp(7),
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomColor: '#EFEFEF',
        borderBottomWidth: 1,
        paddingBottom: hp(2),
        paddingTop: hp(2),
      }}>
      <Image
        source={{uri: item.iconscur}}
        style={{
          height: 40,
          width: 40,
          resizeMode: 'contain',
          marginRight: 10,
          borderRadius: 100 / 2,
        }}
      />

      <ResponsiveText
        style={{alignSelf: 'center', fontSize: 5, color: '#000'}}>
        {item.name}
      </ResponsiveText>
    </TouchableOpacity>
  );

  return (
    <Container backgroundColor={'white'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.conntainer}>
          {/* header */}
         

          <Header
        navigation={props.navigation}
        leftIcon={'chevron-left'}
        title={'Add Custom Token'}
        textColor={'#000'}
      
      />

          {/* ././././. */}

            <View showsVerticalScrollIndicator={false}>
              <View style={styles.hadingview}>
                <ResponsiveText style={{...styles.headingtext}}>
                  {'Network'}
                </ResponsiveText>

                <View>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                      refRBSheet.current.open()
                    }}>
                    <ResponsiveText
                      style={{...styles.headingtext, color: '#94959B'}}>
                      {value}
                    </ResponsiveText>
                    <Icon name={'chevron-right'} size={25} color={'black'} />
                  </TouchableOpacity>
                </View>
              </View>
              {/*  */}
              <ResponsiveText
                style={{color: 'red', marginLeft: 30, marginTop: 10}}>
                {addressErrorMsg}
              </ResponsiveText>

              <View style={styles.maininputview}>
                <TextInput
                  style={styles.inputstyleFirst}
                  placeholder="Token Address"
                  placeholderTextColor={'#C8C8C8'}
                 
                  value={address}
                  fontSize={16}
                  onChangeText={text => {
                    ImportToken(text);
                    setAddress(text);
                    setadreserror(false);
                  }}
                />
                {adreserror == true && (
                  <ResponsiveText
                    style={{...styles.errortext, color: '#FF0000'}}>
                    {`Token address can${"'"}t be empty`}
                  </ResponsiveText>
                )}

                <TextInput
                  style={styles.inputstyle}
                  placeholder="Symbol"
                  placeholderTextColor={'#C8C8C8'}
            
                  value={symbol}
                  fontSize={16}
                  onChangeText={text => {
                    setSymbol(text), setsymbolerror(false);
                  }}
                />
                {symbolerror == true && (
                  <ResponsiveText
                    style={{...styles.errortext, color: '#FF0000'}}>
                    {`Symbol can${"'"}t be empty`}
                  </ResponsiveText>
                )}

                <TextInput
                  style={styles.inputstyle}
                  placeholder="Decimal"
                  placeholderTextColor={'#C8C8C8'}
          
                  value={decimal}
                  fontSize={16}
                  onChangeText={text => {
                    setDecimal(text), setdecimalerror(false);
                  }}
                />
                {decimalerror == true && (
                  <ResponsiveText
                    style={{...styles.errortext, color: '#FF0000'}}>
                    {`Decimals can${"'"}t be empty`}
                  </ResponsiveText>
                )}
              </View>

              <View style={styles.dangerview}>
                <View style={styles.dangerviewmain}>
                  <View style={styles.dangerviewsub}>
                  <FontAwesome name={'warning'} size={30} color={'#FF0083'} />

                  </View>
                  <View style={styles.txtview}>
                    <ResponsiveText style={styles.txt}>
                      Anyone can create a token, including fake versions of
                      existing tokens. Learn about scams and security risks
                    </ResponsiveText>
                  </View>
                </View>
              </View>

              {btnDisable == false ? (
                <Button
                  title={'Add Token'}
                  onPress={onSubmit}
                  titleStyle={{fontSize: 4.5}}
              btnContainer={{
                borderRadius: 5,
                marginTop: 30,
                borderRadius: 30,
              }}
                />
              ) : (
                <Button
                  title={'Add Token'}
                  onPress={() => GetWallet}
                  titleStyle={{fontSize: 4.5}}
                  btnContainer={{
                    borderRadius: 5,
                    marginTop: 30,
                    borderRadius: 30,
                    backgroundColor: '#EAEAEA',
                  }}
                />
              )}
            </View>
       
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setShowAlert(false)}>
        <RBSheet
          ref={refRBSheet}
          height={hp(95)}
          closeOnDragDown={false}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              bottom: 40,
            },
            draggableIcon: {
              backgroundColor: '#fff',
            },
          }}>
          <View>
            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={styles.touchmainView}>
              <View style={styles.viewimg}>
                <Image source={Images.leftarrow} style={styles.leftarrow} />
              </View>
              <View style={styles.netWork}>
                <ResponsiveText style={{fontSize: 10, color: '#000'}}>
                  {'Network'}
                </ResponsiveText>
              </View>
            </TouchableOpacity>
            <View style={{marginTop: hp(2), backgroundColor: 'black'}} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                contentContainerStyle={{paddingBottom: 200}}
                data={array}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                listKey={(item, index) => index.toString()}
              />
            </ScrollView>
         
          </View>
        </RBSheet>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default CustomToken;
