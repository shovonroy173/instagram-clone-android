import { View, TextInput } from 'react-native';

export default function ChatSearchBar() {
  return (
    <View className="bg-gray-100 rounded-md px-4">
      <TextInput
        className="text-base"
        placeholder="Search"
        placeholderTextColor="#888"
      />
    </View>
  );
}
