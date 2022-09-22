import React, {useState,useEffect} from 'react';
import {View, TouchableOpacity, Image, FlatList} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import {Container,ERC20, ResponsiveText, Header,Images} from '../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {openDatabase} from 'react-native-sqlite-storage';
import '../../../../shim';

import Web3 from 'web3';
import axios from 'axios';

const Wallet = props => {
  const [walledAddress, setWalletAddress] = useState('');
  const [mytotalbalnce, setmytotalbalnce] = useState('');
  const [ChainData, setChainData] = useState([]);
useEffect(()=>{
  setInterval(() => {
    getmywallet();
    getallTokens();
    getCurrencyBalance();
    console.log('call every 20 second');
  }, 10000);
},[])


React.useEffect(() => {
  const unsubscribe = props.navigation.addListener('focus', () => {
    getmywallet();
  getallTokens();
  getCurrencyBalance();
  getTokenBalance();
  });

  return unsubscribe;
}, [props.navigation]);
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

  const getmywallet=()=>{
 
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tblWallet', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
          setWalletAddress(results.rows.item(0).publicAddress)
      });
    });
  }
  const mybalancesum = temp => {
    try {
      if (temp != undefined) {
        const sum = temp.reduce((accumulator, object) => {
          return accumulator + object.dollorValue;
        }, 0);
        setmytotalbalnce(sum);
      }
    } catch (err) {
      console.log('err is', err);
    }
  };

  const getallTokens=()=>{
 
    db.transaction(tx => {

      tx.executeSql('SELECT * FROM tblToken', [], (tx, results) => {
        var tokens = [];
        for (let i = 0; i < results.rows.length; ++i)
        tokens.push(results.rows.item(i));
        mybalancesum(tokens)
  
        setChainData(tokens)
      });
    });
  }

  // base curency addres 5 change
  let ethereum = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  let bsc = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
  // get token balance and update balance to database
  const getTokenBalance = async () => {
    console.log('calllll')

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tblWallet', [], (tx, res) => {
        db.transaction(async tx => {
         
          tx.executeSql(
            'SELECT * FROM tblToken where active = 1 And type=?',
            ['token'],
            async (tx, results) => {
              
              var temp = [];

              if (results.rows.length > 0) {
                for (let i = 0; i < results.rows.length; ++i) {
                  temp.push(results.rows.item(i));
         
                  let web3 = new Web3(results.rows.item(i).rpcUrl);
               
                  const contract = new web3.eth.Contract(
                    ERC20,
                    results.rows.item(i).tokenAddress,
                  );
              

                  let balanceOf = await contract.methods
                    .balanceOf(res.rows.item(0).publicAddress)
                    .call();
                    let balance = await web3.utils.fromWei(balanceOf, 'ether');
                
                  let query = `{
              ethereum(network:${
                results.rows.item(i).chainName == 'Ethereum'
                  ? 'ethereum'
                  : results.rows.item(i).chainName == 'Binance smart chain'
                  ? 'bsc'
                  : 'busd'
              }) {
                dexTrades(
                  baseCurrency: {is: "${results.rows.item(i).tokenAddress}"}
                  quoteCurrency: {is: "${
                    results.rows.item(i).chainName == 'Ethereum'
                      ? ethereum
                      : bsc
                  }"}
                  options: {desc: ["block.height", "transaction.index"], limit: 1}
                ) {
                  block {
                    height
                    timestamp {
                      time(format: "%Y-%m-%d %H:%M:%S")
                    }
                  }
                  transaction {
                    index
                  }
                  quotePrice
                }
              }
            }`;

                  await axios
                    .post(
                      'https://graphql.bitquery.io/',
                      {query},
                      {
                        headers: {
                          'X-API-KEY': 'BQYqWGCMFLVUSlyMUTkUXQOL1n9Benpp',
                        },
                      },
                    )
                    .then(response => {
                      console.log('====================================');
                      console.log(results.rows.item(i).chainName,response);
                      console.log('====================================');
                      db.transaction(tx => {
                        tx.executeSql(
                          'UPDATE tblToken set current_price=? , usd_24h_change=? ,balance=?,dollorValue=? where id=?',
                          [
                            response.data.data.ethereum.dexTrades[0]
                              ?.quotePrice == undefined
                              ? 0
                              : response.data.data.ethereum.dexTrades[0]
                                  ?.quotePrice,
                            0,
                            balance,

                            response.data.data.ethereum.dexTrades[0]
                              ?.quotePrice == undefined
                              ? 0
                              : balance *
                                response.data.data.ethereum.dexTrades[0]
                                  ?.quotePrice,
                            results.rows.item(i).id,
                          ],
                          (tx, resul) => {
                            if (resul.rowsAffected > 0) {
                              // getaccounts();
                              // mybalancesum();
                            } else {
                            }
                          },
                        );
                      });
                    })
                    .catch(error => {
                      console.log('error=====>>>>', error);
                    });
                }
              } else {
              }
            },
          );
        });
      });
    });
  };

  // get coin balnce ids and chain name fetch from sql lite
  const getCurrencyBalance = async () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tblWallet', [], (tx, res) => {
   
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM tblToken where type=?`,
            ['chain'],
            async (tx, results) => {
              if (results.rows.length > 0) {
                for (let i = 0; i < results.rows.length; i++) {
                  console.log('web3===>>>>>>>>>>>>',i,results.rows.item(i).rpcUrl);
                  let web3 = new Web3(results.rows.item(i).rpcUrl);
               
                  console.log('web3===>>>>>>>>>>>>',res.rows.item(0).publicAddress,);

                  let getbalance = await web3.eth.getBalance(
                    res.rows.item(0).publicAddress,
                  );

                  let balance = web3.utils.fromWei(getbalance, 'ether');
                  console.log('web3===>>>>>>>>>>>>','balance',balance);

                  GetPriceCurrency(
                    balance,
                    results.rows.item(i).rpcUrlname,
                    results.rows.item(i).id,
                  );
                }
              } else {
                tempArray = [];
                // setListData([]);
              }
            },
          );
        });
      });
    });
  };

  // /get Currency CoinPrice and update price to database
  const GetPriceCurrency = async (balance, item, id) => {
    try {
      await axios({
        // url: `https://api.coingecko.com/api/v3/coins/${item}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
        url: `https://api.coingecko.com/api/v3/simple/price?ids=${item}&vs_currencies=usd&include_24hr_change=true`,
        method: 'GET',
      })
        .then(response => {
          console.log("========================")
          console.log(response.data)
          console.log("")
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE tblToken set current_price=? , usd_24h_change=? ,balance=?,dollorValue=? where id=?',
              [
                item == 'ethereum'
                  ? response.data.ethereum.usd
                  : item == 'binancecoin'
                  ? response.data.binancecoin.usd
                  : 0,

                item == 'ethereum'
                  ? response.data.ethereum.usd_24h_change
                  : item == 'binancecoin'
                  ? response.data.binancecoin.usd_24h_change
                  : 0,
                balance,
                balance *
                  (item == 'ethereum'
                    ? response.data.ethereum.usd
                    : item == 'binancecoin'
                    ? response.data.binancecoin.usd
                    : 0),
                id,
              ],

              (tx, resul) => {
                console.log('Results===........', resul,tx);
                if (resul.rowsAffected > 0) {
             
                } else console.log('Updation Failed========>');
              },
            );
          });
        })
        .catch(err => {
          console.log('err======>>::::', err.message);
        });
    } catch (error) {
      console.log('errrorrrr coin geko', error);
    }
  };



const renderchains=({item,index})=>{
 
  return(

      <TouchableOpacity   
      onPress={() => props.navigation.navigate('History',{
        mywalletaddress:walledAddress,
        item:item
      })}
       style={styles.listView}>
     
        <View style={styles.listStyle}>
        {item.type == 'chain' ? (
                <Image
                  source={
          
                      item.tokenName == 'Ethereum'
                        ? Images.ethereum
                        : item.tokenName == 'Binance Smart Chain'
                        ? Images.bnblogo
                        : Images.tokenplaceholder
                  }
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'contain',
                    marginRight: 10,
                    borderRadius: 50 / 2,
                  }}
                />
              ) : item.tokenlogo == '' ? (
                <Image
                  source={Images.tokenplaceholder}
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'contain',
                    marginRight: 10,
                    borderRadius: 50 / 2,
                  }}
                />
              ) : (
                <Image
                  source={{uri: item.tokenlogo}}
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'cover',
                    marginRight: 10,
                    borderRadius: 50 / 2,
                  }}
                />
              )}
          <View>
          <ResponsiveText style={styles.currencyName}>
            {item.tokenName}
          </ResponsiveText>
          <ResponsiveText style={{...styles.currencyName,marginTop:5}}>
            ${item.current_price}
          </ResponsiveText>
          </View>
        </View>
        <ResponsiveText style={styles.totalValue}>
          ${item.dollorValue}
        </ResponsiveText>
      
      </TouchableOpacity>
 
  )
}
  return (
    <Container backgroundColor={'white'}>
      <Header
        navigation={props.navigation}
        leftIcon={'chevron-left'}
        title={'My Wallet'}
        rightIcon={'plus-thick'}
        textColor={'#000'}
        righIconOnPress={()=>props.navigation.navigate('CustomToken')}
        righIconColor={'black'}
      />

      <View style={{paddingHorizontal: 20}}>
        <View style={styles.walletView}>
          <ResponsiveText style={styles.walletText}>
            {walledAddress.slice(0,25)}.....{walledAddress.slice(walledAddress.length-5)}
          </ResponsiveText>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(walledAddress),
                Toast.show('Copied!', Toast.LONG);
            }}>
            <Icon name="content-copy" size={18} color="#000" />
          </TouchableOpacity>
        </View>
        {/* current balance view */}
        <View style={styles.balanceView}>
          <View style={styles.currentBalance}>
            <View>
              <ResponsiveText style={{color: '#000'}}>
                {'Your current balance:'}
              </ResponsiveText>
              <ResponsiveText style={styles.dallorsBalance}>
                ${mytotalbalnce}
              </ResponsiveText>
            </View>
            {/* <TouchableOpacity
              onPress={() => props.navigation.navigate('History',{
                mywalletaddress:walledAddress
              })}>
              <Icon name="history" size={23} color="#000" />
            </TouchableOpacity> */}
          </View>
        </View>
        {/* end of current balance view */}
        <View>
          <FlatList
            data={ChainData}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 280}}
            renderItem={renderchains}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Container>
  );
};

export default Wallet;
