import {View, TextInput, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

export default function ChatInput({onSend, value, setValue}) {
  return (
    <View className="flex-row items-center p-3 border-t border-gray-200 bg-white gap-2">
      <TouchableOpacity>
        <Entypo name="emoji-happy" size={24} />
      </TouchableOpacity>
      <TextInput
        className="flex-1 mx-2 px-3 py-2 bg-gray-100 rounded-full"
        placeholder="Send message..."
        value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity>
        <Feather name="camera" size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSend}>
        <Feather name="send" size={24} />
      </TouchableOpacity>
    </View>
  );
}
