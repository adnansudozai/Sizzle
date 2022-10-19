import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/SplashScreen/Splash';
import Login from '../screens/AuthScreens/Login';
import Register from '../screens/AuthScreens/Register';
import PinScreen from '../screens/AuthScreens/PinScreen';
import DashboardTabNavigator from '../navigation/BottomNavigation';
import StakingScreen from '../screens/Staking/StakingScreen';
import DepositScreen from '../screens/Deposit/DepositScreen';
import WithdrawScreen from '../screens/Withdraw/WithdrawScreen';
import WithdrawConfirmScreen from '../screens/Withdraw/WithdrawConfirmScreen';
import Account from '../screens/BottomTabs/ProfileScreen/ProfileSettings/Account';
import AccountSecurity from '../screens/BottomTabs/ProfileScreen/ProfileSettings/AccountSecurity';
import AccountVerfication from '../screens/BottomTabs/ProfileScreen/ProfileSettings/AccountVerfication';
import GAuthSetup from '../screens/BottomTabs/ProfileScreen/ProfileSettings/GAuthSetup';
import GAuthBackup from '../screens/BottomTabs/ProfileScreen/ProfileSettings/GAuthBackup';
import Referrals from '../screens/BottomTabs/ProfileScreen/ProfileSettings/Referrals';
import Forgotpassword from '../screens/AuthScreens/Forgotpassword';
import Notification from '../screens/BottomTabs/ProfileScreen/Notification/Notification';
import FAQ from '../screens/BottomTabs/ProfileScreen/Helpcenter/FAQ';
import Community from '../screens/BottomTabs/ProfileScreen/ProfileSettings/Community/Community';
import Changepassword from '../screens/Changepassword/Changepassword';
import Createpin from '../screens/AuthScreens/Enterpin'
import { requestUserPermission,notificationListener } from '../components/Notificationservices';
const Stack = createStackNavigator();


const ProfileSettingsStack = () => {
  return (
    <Stack.Navigator 
    screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="settingsAccount" component={Account} />
      <Stack.Screen
        name="settingsAccountSecurity"
        component={AccountSecurity}
      />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="Community" component={Community} />

      <Stack.Screen
        name="settingsAccountVerfication"
        component={AccountVerfication}
      />
      <Stack.Screen name="settingsGAuthSetup" component={GAuthSetup} />
      <Stack.Screen name="settingsGAuthBackup" component={GAuthBackup} />
      <Stack.Screen name="settingsReferrals" component={Referrals} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  React.useEffect(()=>{
    notificationListener()
    requestUserPermission()
  },[])

  return (
    <Stack.Navigator initialRouteName="Splash" 
    screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PinScreen" component={PinScreen} />
      <Stack.Screen name="StakingScreen" component={StakingScreen} />
      <Stack.Screen name="Createpin" component={Createpin} />
      <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
      <Stack.Screen name="DepositScreen" component={DepositScreen} />
      <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />
      <Stack.Screen name="WithdrawConfirm" component={WithdrawConfirmScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsStack} />
      <Stack.Screen name="Changepassword" component={Changepassword} />
      <Stack.Screen
        name="DashboardTabNavigator"
        component={DashboardTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
