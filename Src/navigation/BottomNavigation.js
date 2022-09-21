import React, {useState, useEffect, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/BottomTabs/HomeScreen/Home';
import Profile from '../screens/BottomTabs/ProfileScreen/Profile';
import Wallet from '../screens/BottomTabs/WalletScreen/Wallet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import Reward from '../screens/BottomTabs/RewardScreen/Reward';
import History from '../screens/BottomTabs/HistoryScreen/History';
import createWalletScreen from '../screens/BottomTabs/WalletScreen/createWallet/createWalletScreen';
import YourSecretPharase from '../screens/BottomTabs/WalletScreen/createWallet/YourSecretPharase';
import CoursesScreen from '../screens/BottomTabs/HomeScreen/Empower/CoursesScreen';
import CourseVideosScreen from '../screens/BottomTabs/HomeScreen/Empower/CourseVideosScreen';
import Arcadia from '../screens/BottomTabs/ArcadeScreen/Arcadia';
import PlayGame from '../screens/BottomTabs/ArcadeScreen/PlayGame';
import VerifyYourSecrete from '../screens/BottomTabs/WalletScreen/createWallet/VerifyYourSecrete';
import AlreadyWalletScreen from '../screens/BottomTabs/WalletScreen/AlreadyWallet/AlreadyWalletScreen';
import ImportwithPhrase from '../screens/BottomTabs/WalletScreen/AlreadyWallet/ImportwithPhrase';
import CustomToken from '../screens/BottomTabs/WalletScreen/AddCustomTokens/customTokens';
import {openDatabase} from 'react-native-sqlite-storage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const walletStack = () => {

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="createWalletScreen" component={createWalletScreen} />
      <Stack.Screen name="YourSecretPharase" component={YourSecretPharase} />
      <Stack.Screen name="VerifyYourSecrete" component={VerifyYourSecrete} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="CustomToken" component={CustomToken} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen
        name="AlreadyWalletScreen"
        component={AlreadyWalletScreen}
      />
      <Stack.Screen name="ImportwithPhrase" component={ImportwithPhrase} />
    </Stack.Navigator>
  );

};
const walletStack2 = () => {

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="CustomToken" component={CustomToken} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );

};

const homeStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CoursesScreen" component={CoursesScreen} />
      <Stack.Screen name="CourseVideosScreen" component={CourseVideosScreen} />
    </Stack.Navigator>
  );
};

const arcadeStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Arcadia" component={Arcadia} />
      <Stack.Screen name="Playgame" component={PlayGame} />
    </Stack.Navigator>
  );
};

function DashboardTabNavigator() {

  const [SelectedWalletID,setSelectedWalletID]=useState('')
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
useEffect(()=>{
  console.log('use effect call');
  GetWallet();
},[])
const GetWallet = cahinName => {
   
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM tblWallet', [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i){
        temp.push(results.rows.item(i));
      console.log('results.rows.item(i)',results.rows.item(i));
      setSelectedWalletID(results.rows.item(0).publicAddress);
      
      }
     

    });
  });
};

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: true,
        tabBarLabelStyle: {
          backgroundColor: 'red',
          height: 100,
        },
      }}
      screenOptions={{
        headerShown: false,
      }}>
        
      <Tab.Screen
        name="Home"
        component={homeStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icons name="ios-home" size={22} color={'#FC4070'} />
            ) : (
              <Icons name="ios-home-outline" size={22} color={'#FC4070'} />
            ),
        }}
      />
      

      <Tab.Screen
        name="Wallet"
        component={SelectedWalletID==''?walletStack:walletStack2}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="wallet" size={22} color={'#FC4070'} />
            ) : (
              <Icon name="wallet-outline" size={22} color={'#FC4070'} />
            ),
        }}
      />
  
      <Tab.Screen
        name="Reward"
        component={Reward}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="star" size={25} color={'#FC4070'} />
            ) : (
              <Icon name="star-outline" size={25} color={'#FC4070'} />
            ),
        }}
      />

      <Tab.Screen
        name="Arcadia"
        component={arcadeStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icons name="game-controller" size={25} color="#FC4070" />
            ) : (
              <Icons name="game-controller-outline" size={25} color="#FC4070" />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon name="account-settings" size={25} color="#FC4070" />
            ) : (
              <Icon name="account-settings-outline" size={25} color="#FC4070" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default DashboardTabNavigator;
