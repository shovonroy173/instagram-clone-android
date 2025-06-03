import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable, Modal, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useCreateGroupMutation } from '../redux/userSlice';
import { useSelector } from 'react-redux';
import { formatMessageTime } from '../utils/formateDate';

export default function ChatListItem({ item, selected = false }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [createGroup, {isLoading, isError, isSuccess}] = useCreateGroupMutation();
    const loggedUserId = useSelector(state => state.auth.user);
    console.log("ChatListItem", item);
    

  const handleLongPress = () => {
    setModalVisible(true);
  };

const handleCreateGroup = async () => {
  try {
    const response = await createGroup({
      name: 'My Group Name',
      memberIds: [loggedUserId?.userId, item._id], // ✅ correct key
      adminId: loggedUserId?.userId,               // ✅ new field
    }).unwrap();

    console.log('Group created:', response);
    setModalVisible(false);
    navigation.navigate('SingleChat', { groupId: response._id }); // use _id returned by Mongo
  } catch (error) {
    console.error('Group creation failed:', error);
    alert('Failed to create group');
  }
};


  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('SingleChat', item)}
        onLongPress={handleLongPress}
        className={`flex-row items-center py-3 px-2 ${selected ? 'bg-blue-100' : ''}`}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100?img=1' }}
          className="w-12 h-12 rounded-full"
        />
        <View className="flex-1 ml-3">
          <Text className="font-semibold">{item.name}</Text>
          <Text className="text-sm text-gray-500" numberOfLines={1}>
            {item.lastMessage || 'Start chatting'}
          </Text>
        </View>
        <Text className="text-xs text-gray-400">{formatMessageTime(item.time) || ''}</Text>
      </Pressable>

      {/* Modal for Group Options */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          className="flex-1 justify-center items-center bg-black/50"
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View className="bg-white p-5 rounded-xl w-3/4">
            <Text className="text-lg font-semibold mb-3">Add to Group</Text>
            <TouchableOpacity
              className="py-2"
              onPress={handleCreateGroup}>
              <Text className="text-blue-600 text-center">Add {item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-2 mt-2"
              onPress={() => setModalVisible(false)}>
              <Text className="text-red-500 text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
