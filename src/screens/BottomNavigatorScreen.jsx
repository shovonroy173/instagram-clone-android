import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import AddPostScreen from './AddPostScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const BottomNavigatorScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView className="flex-1">
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: responsiveHeight(10),
            paddingTop: responsiveHeight(2.5),
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Feather
                name="home"
                size={24}
                color={focused ? '#f43f5e' : '#000000'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Feather
                name="search"
                size={24}
                color={focused ? '#f43f5e' : '#000000'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Feather
                name="plus-square"
                size={24}
                color={focused ? '#f43f5e' : '#000000'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Feather
                name="heart"
                size={24}
                color={focused ? '#f43f5e' : '#000000'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../../assets/images/auth.webp')}
                style={{
                  objectFit: 'cover',
                  width: responsiveWidth(9),
                  height: responsiveWidth(9),
                  borderRadius: 100,
                  borderWidth: focused ? 1 : 0,
                  borderColor: '#f43f5e',
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomNavigatorScreen;
