import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';

export default function ChatListItem({ item }) {
  const navigation = useNavigation();
  return (
    <Pressable className="flex-row items-center  py-3" onPress={()=> navigation.navigate("SingleChat")}>
      <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full" />
      <View className="flex-1 ml-3">
        <Text className="font-semibold">{item.name}</Text>
        <Text className="text-sm text-gray-500" numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      <Text className="text-xs text-gray-400">{item.time}</Text>
    </Pressable>
  );
}
