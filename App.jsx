import {createNativeStackNavigator} from '@react-navigation/native-stack';
import './global.css';
import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import BottomNavigatorScreen from './src/screens/BottomNavigatorScreen';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="BottomNavigator"
            component={BottomNavigatorScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
