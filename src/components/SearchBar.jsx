import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ value, onChangeText, placeholder = 'Search...' }) => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-md mx-2 px-2" >
      <Icon name="search" size={20} color="#6b7280" />
      <TextInput
        className="ml-2 flex-1 text-gray-800"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
      />
    </View>
  );
};

export default SearchBar;
