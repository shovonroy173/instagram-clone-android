import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileTabs = ({ selectedTab, setSelectedTab }) => (
  <View className="flex-row border-t border-b border-gray-200 mt-4">
    <TouchableOpacity
      onPress={() => setSelectedTab('posts')}
      className="flex-1 items-center py-2"
    >
      <MaterialIcons
        name="grid-on"
        size={24}
        color={selectedTab === 'posts' ? 'black' : 'gray'}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => setSelectedTab('tagged')}
      className="flex-1 items-center py-2"
    >
      <MaterialIcons
        name="person-pin"
        size={24}
        color={selectedTab === 'tagged' ? 'black' : 'gray'}
      />
    </TouchableOpacity>
  </View>
);

export default ProfileTabs;
