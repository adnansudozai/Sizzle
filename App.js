import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox} from 'react-native';
import Navigation from './Src/navigation';
import './shim';

const App = () => {
  const ReactNative = require('react-native');
  try {
    ReactNative.I18nManager.allowRTL(false);
  } catch (e) {
    console.log(e);
  }
  LogBox.ignoreAllLogs();
  return <Navigation />;
};

export default App;
