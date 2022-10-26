import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function requestUserPermission() {
try {


  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
console.log('enabled===',enabled);
  if (enabled) {
    console.log("Authorization status:", authStatus);
    getfcmToken();
  }
  
} catch (error) {
  console.log('requestUserPermission',error);
  
}


}
const getfcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem("fcmToken");
  console.log(`the old token`, fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(`the new generated token `, fcmToken);
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    } catch (error) {
      console.log(`error raised in fcm token`, error);
    }
  }
};
export const notificationListener = async () => {
 try {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from openapp state:",
      remoteMessage.notification
    );
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });
  
 } catch (error) {
  console.log('notificationListener', error);
  
 }
};