import {createNativeStackNavigator} from '@react-navigation/native-stack';
import './global.css';
import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import BottomNavigatorScreen from './src/screens/BottomNavigatorScreen';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SingleChatScreen from './src/screens/SingleChatScreen';
import ChatScreen from './src/screens/ChatScreen';
import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './src/root/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
