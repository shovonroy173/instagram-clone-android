import {View, Text, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ChatHeader() {
  return (
    <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
      <Text className="text-xl font-bold">Username</Text>
      <View className="flex-row gap-2">
        <TouchableOpacity>
          <AntDesign
            name="videocamera"
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo
            name="dots-three-vertical"
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
