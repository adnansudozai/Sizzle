import React, {useState,useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Container, ResponsiveText,Loader, Header} from '../../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import '../../../../shim';

import Web3 from 'web3';
import axios from 'axios';
const History = props => {
  const [toggle, setToggle] = useState(false);
  const [Historydata,setHistorydata]=useState([])
  const [Loading, setloading] = useState(false);

  useEffect(()=>{
  
   if(props.route.params.item.chainName=='Binance Smart Chain'){
    bschistory();
   }
   else{
    getetherhistory()
   }
  },[])

  const bschistory=async()=>{
    setloading(true)
    let web3binance = new Web3('https://rpc.ankr.com/bsc');
    let obj = [];
    let array = [];
    console.log('transextion', props.route.params.mywalletaddress, blocknumber);
try {
  var blocknumber = await web3binance.eth.getBlockNumber();
  console.log('transextion', props.route.params.mywalletaddress, blocknumber);

  const binanceresult = await axios.get(
    `https://api.bscscan.com/api?module=account&action=txlist&address=${props.route.params.mywalletaddress}&startblock=0&endblock=${blocknumber}&sort=desc&apikey=7SPAWMVTISPTNHNPSYCF2KXXI6FQ39GTF3`,
  );
  if(binanceresult){
    setloading(false)
  }
  binanceresult.data.result.map(async item => {
    const milliseconds = item.timeStamp * 1000;

    const dateObject = new Date(milliseconds);
    let date = dateObject.toISOString().split('T');
    let dateformate = date[0];
    // / 100000000
    var etherwithdrawamount1 = web3binance.utils.fromWei(
      item.value.toString(),
      'ether',
    );

    obj = {
      value: etherwithdrawamount1,
      to: item.to,
      date: dateformate,
      hash: item.hash,

    };

    array.push(obj);
  });

  setHistorydata(array);
  console.log('transextion===>>>',binanceresult);
} catch (error) {
  setloading(false)
}
   
  }

  const getetherhistory= async()=>{
    setloading(true)
    

      let web3 = new Web3('https://rpc.ankr.com/eth');
      console.log('web3=====>>>>nj>', web3);

      try {

      var blocknumber = await web3.eth.getBlockNumber();
      console.log('transextion', props.route.params.mywalletaddress, blocknumber);
  
      const result = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${props.route.params.mywalletaddress}&startblock=0&endblock=${blocknumber}&sort=asc&apikey=U2TQCDDSJBGSKSII5HXNTRQIR4ATTXV1UD`,
      );
if(result){
  setloading(false)
}
    
      let obj = [];
      let array = [];
      result.data.result.map(async item => {
        const milliseconds = item.timeStamp * 1000;
  
        const dateObject = new Date(milliseconds);
        let date = dateObject.toISOString().split('T');
        let dateformate = date[0];
        // / 100000000
        var etherwithdrawamount1 = web3.utils.fromWei(
          item.value.toString(),
          'ether',
        );
  
        obj = {
          value: etherwithdrawamount1,
          to: item.to,
          date: dateformate,
          hash: item.hash,
   
        };
  
        array.push(obj);
      });
    
  
      setHistorydata(array);
      console.log('transextion===>>>', result);
  
  
        
      } catch (error) {
        setloading(false)
      }
  

  }
  const renderwithdraw=({item,index})=>{
    console.log('hashhhh',item.hash);
let dolarorice=props.route.params.item.current_price*item.value
    return(
      <View>
        {item.to.toLowerCase()==props.route.params.mywalletaddress.toLowerCase()?

      <View style={styles.mainView}>
      <View style={styles.listView}>
        <View style={styles.withdrawView}>
          <Icon name="arrow-collapse-up" size={15} color="#000" />
          <View style={{marginLeft: 10}}>
            <ResponsiveText style={styles.withdrawText}>
              {'Withdraw'}
            </ResponsiveText>
            <ResponsiveText style={{color: '#000'}}>
              {item.date}
             
            </ResponsiveText>
          </View>
        </View>
        <View>
          <ResponsiveText style={styles.dallorText}>
            ${dolarorice}
          </ResponsiveText>
        </View>
      </View>
    
    </View>
    :null
  }
    </View>
    )
  }


  const renderseposit=({item,index})=>{
    let dolarorice=props.route.params.item.current_price*item.value

    return(
      <View>
        {item.to.toLowerCase()!=props.route.params.mywalletaddress.toLowerCase()?
  <View style={styles.depositView}>
  <View style={styles.deposit}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon name="arrow-collapse-down" size={15} color="#000" />
      <View style={{marginLeft: 10}}>
        <ResponsiveText style={styles.depositText}>
          {'Deposit'}
        </ResponsiveText>
        <ResponsiveText style={{color: '#000'}}>
          {item.date}
        
        </ResponsiveText>
      </View>
    </View>
    <View>
      <ResponsiveText style={{color: '#000', paddingRight: 20}}>
        {dolarorice}
      </ResponsiveText>
    </View>
  </View>
</View>
    :null
  }
    </View>
    )
  }
  return (
    <Container backgroundColor={'white'}>
      <Loader loading={Loading} />

      <Header
        navigation={props.navigation}
        leftIcon={'chevron-left'}
        title={'History'}
        textColor={'#000'}
      />
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => {setToggle(false)}}>
          <ResponsiveText style={!toggle ? styles.view1 : styles.view2}>
            {'Withdraw'}
          </ResponsiveText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {setToggle(true)}}>
          <ResponsiveText style={toggle ? {...styles.view1,borderBottomColor:'green'}  : styles.view2}>
            {'Deposit'}
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      {!toggle ? (
        <View style={{paddingHorizontal: 20,borderWidth:0}}>
          <FlatList
            data={Historydata}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 280}}
            renderItem={renderwithdraw}
          />
        </View>
      ) : (
        <View style={{paddingHorizontal: 20}}>
          <FlatList
            data={Historydata}
            contentContainerStyle={{paddingTop: 20, paddingBottom: 280}}
            renderItem={renderseposit}
          />
        </View>
      )}
    </Container>
  );
};
export default History;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    marginTop: 40,
  },
  view1: {
    color: '#000',
    fontSize: 5,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  view2: {
    color: '#000',
    fontSize: 5,
    fontWeight: '600',
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  withdrawView: {flexDirection: 'row', alignItems: 'center'},
  withdrawText: {
    color: '#000',
    fontSize: 4,
    fontWeight: '700',
  },
  dallorText: {color: '#000', paddingRight: 20},
  depositView: {
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'green',
    marginVertical: 5,
    borderRadius: 5,
  },
  deposit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  depositText: {
    color: '#000',
    fontSize: 4,
    fontWeight: '700',
  },
  mainView: {
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#FC4070',
    marginVertical: 5,
    borderRadius: 5,
  },
});
