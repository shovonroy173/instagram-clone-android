import React from 'react';
import { View, Image, Text } from 'react-native';

const ProfileHeader = () => (
  <View className="flex-row items-center px-4 pt-4">
    <Image
      source={{ uri: 'https://i.pravatar.cc/150' }}
      className="w-20 h-20 rounded-full"
    />
    <View className="flex-1 flex-row justify-around">
      {['12', '340', '180'].map((count, index) => (
        <View key={index} className="items-center">
          <Text className="text-lg font-bold">{count}</Text>
          <Text className="text-xs text-gray-500">
            {['Posts', 'Followers', 'Following'][index]}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

export default ProfileHeader;
