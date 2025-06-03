import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomNavigatorScreen from '../screens/BottomNavigatorScreen';
import ChatScreen from '../screens/ChatScreen';
import SingleChatScreen from '../screens/SingleChatScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import GroupChatScreen from '../screens/GroupChatScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const token = useSelector(state => state.auth.token);
  console.log('LINE AT AppNavigator.js', token);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!token ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="BottomNavigator"
              component={BottomNavigatorScreen}
            />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="SingleChat" component={SingleChatScreen} />
            <Stack.Screen name="GroupChat" component={GroupChatScreen} />
            <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
