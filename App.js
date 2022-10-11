import 'react-native-gesture-handler';
import * as React from 'react';
import Navigation from './Src/navigation';
import {Provider} from 'react-redux';
import {store} from './Src/redux/store';
import {LogBox} from 'react-native';


const App = () => {
  const ReactNative = require('react-native');
  try {
    ReactNative.I18nManager.allowRTL(false);
  } catch (e) {
    console.log(e);
  }
  LogBox.ignoreAllLogs();//Hide all warning notifications on front-end

  return(
    <Provider 
    store={store}>
     
     <Navigation/>
  
     </Provider>
     )
};

export default App;

