import React ,{useState,useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {Container, ResponsiveText,ERC20, Images} from '../../../components';
import styles from './styles';
import '../../../../shim';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {openDatabase} from 'react-native-sqlite-storage';
import Web3 from 'web3';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { check_userauth } from '../../../Api/Api';

const Home = props => {
  let userdata=useSelector(state => state.userdataReducer)

React.useEffect(() => {
  const unsubscribe = props.navigation.addListener('focus', () => {
    console.log('userdata===',userdata );
  getCurrencyBalance();
  getTokenBalance();
  mybalancesum();
  getallTokens();
  checkauth()
  });

  return unsubscribe;
}, [props.navigation]);
  const db = openDatabase(
    {name: 'sizzleWallet.db', createFromLocation: 1},
    successCB,
    errorCB,
    openCB,
  );
  const checkauth=async()=>{
   await check_userauth(userdata.barerToken).then((res)=>{
    console.log('res==',res);
   }).catch((err)=>{
    console.log('errorrrr',err);
   })
   
  }

  const errorCB = err => {
    console.log('SQL Error: ' + err);
  };

  const successCB = () => {
    console.log('SQL executed fine');
  };
  const openCB = () => {
    console.log('Database OPENED');
  };

  const [mywalledAddress, setmyWalletAddress] = useState('');
  const [privateKey, setprivateKey] = useState('');
  const [mytotalbalnce, setmytotalbalnce] = useState(0);
  const [myassets, setmyassets] = useState([]);

  const getallTokens=()=>{
 
    db.transaction(tx => {

      tx.executeSql('SELECT * FROM tblToken', [], (tx, results) => {
        console.log('====================================');
        console.log(results);
        console.log('====================================');
        var tokens = [];
        for (let i = 0; i < results.rows.length; ++i)
        tokens.push(results.rows.item(i));
        mybalancesum(tokens)
        setmyassets(tokens)
     
      });
    });
  }


  let data = [
    {
      id: 1,
      image:
        'https://cdn.pixabay.com/photo/2016/08/30/16/26/banner-1631296__340.jpg',
    },
    {
      id: 2,
      image:
        'https://cdn.pixabay.com/photo/2016/08/30/16/26/banner-1631296__340.jpg',
    },
    {
      id: 3,
      image:
        'https://cdn.pixabay.com/photo/2016/08/30/16/26/banner-1631293__340.jpg',
    },
  ];


  // base curency addres 5 change
  let ethereum = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  let bsc = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
  // get token balance and update balance to database
  const getTokenBalance = async () => {
    console.log('calllll')
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tblWallet', [], (tx, res) => {
    setmyWalletAddress(res.rows.item(0).publicAddress)
    setprivateKey(res.rows.item(0).PrivateKey)
  

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
                              getallTokens()
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
                  getallTokens()
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
  
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.topImage}
        />
      </View>
    );
  };

  return (
    <Container backgroundColor={'white'}>
      <View style={styles.headerView}>
        <TouchableOpacity style={{alignSelf: 'center',width: 50, height: 50,borderRadius:50/2,resizeMode:'cover'}}>
          {userdata.userdata.image_url?
          <Image source={{uri:userdata.userdata.image_url}} style={{width: 50, height: 50,borderRadius:50/2,resizeMode:'cover'}} />
          :
          <Image source={Images.profile} style={{width: 50, height: 50,borderRadius:50/2,resizeMode:'cover'}} />
}
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <Icon name="bell-outline" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      {/* end of header */}
      <ScrollView>
        <View style={styles.promotionCard}>
          <FlatList
          showsHorizontalScrollIndicator={false}
            contentContainerStyle={{marginLeft: 20}}
            horizontal={true}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.cardView}>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Image source={Images.leotoken} style={styles.radixIcon} />
            <ResponsiveText
              style={styles.sizzleText}>{`Sizzle`}</ResponsiveText>
          </View>
          <ResponsiveText style={styles.totalBalnce}>
            {'Total Balance:'}
            {'  '}
            {`(${mytotalbalnce})`}
          </ResponsiveText>
          <ResponsiveText style={styles.sizzelbalnce}>
            {'5,000'} {'Sizzle'}
          </ResponsiveText>

          <View style={styles.transactionView}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('DepositScreen',{
                mywalledAddress:mywalledAddress
              })}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="arrow-collapse-down" size={12} color="#fff" />
              <ResponsiveText style={styles.depositView}>
                {'Deposit'}
              </ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('WithdrawScreen',{
                myassets:myassets,
                privateKey:privateKey,
                mywalledAddress:mywalledAddress
              })}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="arrow-collapse-down" size={12} color="#fff" />
              <ResponsiveText style={styles.depositView}>
                {'Withdraw'}
              </ResponsiveText>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="shopping-outline" size={12} color="#fff" />
              <ResponsiveText style={styles.depositView}>
                {'Buy'}
              </ResponsiveText>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('StakingScreen')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="database" size={12} color="#fff" />
                <ResponsiveText style={styles.depositView}>
                  {'Stake'}
                </ResponsiveText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* blueMoon view */}
        <View style={styles.imageView}>
          {/* Bluemoon */}
          <TouchableOpacity style={{width: 70}}>
            <Image source={Images.bluemoon} style={styles.imageStyle} />
            <ResponsiveText style={styles.textStyle}>
              {'Bluemoon'}
            </ResponsiveText>
          </TouchableOpacity>
          {/* Arcadia */}
          <TouchableOpacity style={{width: 70}}>
            <Image source={Images.bluemoon} style={styles.imageStyle} />
            <ResponsiveText style={styles.textStyle}>
              {'Arcadia'}
            </ResponsiveText>
          </TouchableOpacity>
          {/* Rewards */}
          <TouchableOpacity style={{width: 70}}>
            <Image source={Images.bluemoon} style={styles.imageStyle} />
            <ResponsiveText style={styles.textStyle}>
              {'Rewards'}
            </ResponsiveText>
          </TouchableOpacity>
          {/*Empower*/}
          <TouchableOpacity
            style={{width: 70}}
            onPress={() => props.navigation.navigate('CoursesScreen')}>
            <Image source={Images.bluemoon} style={styles.imageStyle} />
            <ResponsiveText style={styles.textStyle}>
              {'Empower'}
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        {/* SynergyView */}
        <View style={styles.imageView}>
          {/* Synergy */}
          <TouchableOpacity style={{width: 70}}>
            <Image source={Images.bluemoon} style={styles.imageStyle} />
            <ResponsiveText style={styles.textStyle}>
              {'Synergy'}
            </ResponsiveText>
          </TouchableOpacity>
          {/* Bio */}
          <TouchableOpacity style={{width: 70}}>
            <Image source={Images.bluemoon} style={styles.imageStyle} />
            <ResponsiveText style={styles.textStyle}>{'Bio'}</ResponsiveText>
          </TouchableOpacity>
          {/* Flair */}
          <TouchableOpacity style={{width: 70}}>
            <Image source={Images.bluemoon} style={styles.imageStyle} />
            <ResponsiveText style={styles.textStyle}>{'Flair'}</ResponsiveText>
          </TouchableOpacity>
          {/*Elevate*/}
          <TouchableOpacity style={{width: 70}}>
            <Image source={Images.bluemoon} style={styles.imageStyle} />
            <ResponsiveText style={styles.textStyle}>
              {'Elevate'}
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Image source={Images.playToEarn} style={styles.playToEarn} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Home;
