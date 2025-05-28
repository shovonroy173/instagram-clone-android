import { View, Text } from 'react-native';

export default function MessageBubble({ message, isMe }) {
  return (
    <View className={`px-4 my-1 ${isMe ? 'items-end' : 'items-start'}`}>
      <View className={`max-w-[80%] px-3 py-2 rounded-2xl ${isMe ? 'bg-blue-500' : 'bg-gray-200'}`}>
        <Text className={`${isMe ? 'text-white' : 'text-black'}`}>{message.text}</Text>
      </View>
    </View>
  );
}
