import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ProfileInfo = () => (
  <View className="px-4 mt-2">
    <Text className="font-bold">Jane Doe</Text>
    <Text className="text-sm">Traveler. Creator. Dreamer.</Text>
    <TouchableOpacity className="mt-2 py-1 px-3 rounded border border-gray-300 items-center">
      <Text>Edit Profile</Text>
    </TouchableOpacity>
  </View>
);

export default ProfileInfo;
