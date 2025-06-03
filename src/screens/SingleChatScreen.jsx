// import {View, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
// import {useState} from 'react';
// import MessageBubble from '../components/MessageBubble';
// import ChatHeader from '../components/Chatheader';
// import ChatSearchBar from '../components/ChatSearchBar';
// import ChatInput from '../components/ChatInput';
// import {useRoute} from '@react-navigation/native';
// import { useSelector } from 'react-redux';

// const messages = [
//   {id: '1', text: 'Hey there!', isMe: false},
//   {id: '2', text: 'Yo! How’s it going?', isMe: true},
//   // ...
// ];

// export default function SingleChatScreen() {
//   const [input, setInput] = useState('');
//   const route = useRoute();
//   const receiver = route.params;
//     const loggedUserId = useSelector(state => state.auth.user);
//   console.log('LINE AT 19', receiver._id, loggedUserId.userId);

//   const handleSend = () => {
//     if (!input.trim()) return;
//     // Handle send logic
//     setInput('');
//   };
//   return (
//     <View className="flex-1 bg-white">
//       <ChatHeader data={receiver} />
//       {/* <ChatSearchBar /> */}
//       <KeyboardAvoidingView
//         className="flex-1 bg-white"
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         keyboardVerticalOffset={90}>
//         <FlatList
//           data={messages}
//           renderItem={({item}) => (
//             <MessageBubble message={item} isMe={item.isMe} />
//           )}
//           keyExtractor={item => item.id}
//           contentContainerStyle={{paddingVertical: 10}}
//           inverted
//         />
//         <ChatInput value={input} setValue={setInput} onSend={handleSend} />
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

/* eslint-disable react-native/no-inline-styles */

// import {View, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
// import {useState} from 'react';
// import MessageBubble from '../components/MessageBubble';
// import ChatHeader from '../components/Chatheader';
// import ChatSearchBar from '../components/ChatSearchBar';
// import ChatInput from '../components/ChatInput';
// import {useRoute} from '@react-navigation/native';
// import { useSelector } from 'react-redux';

// const messages = [
//   {id: '1', text: 'Hey there!', isMe: false},
//   {id: '2', text: 'Yo! How’s it going?', isMe: true},
//   // ...
// ];

// export default function SingleChatScreen() {
//   const [input, setInput] = useState('');
//   const route = useRoute();
//   const receiver = route.params;
//     const loggedUserId = useSelector(state => state.auth.user);
//   console.log('LINE AT 19', receiver._id, loggedUserId.userId);

//   const handleSend = () => {
//     if (!input.trim()) return;
//     // Handle send logic
//     setInput('');
//   };
//   return (
//     <View className="flex-1 bg-white">
//       <ChatHeader data={receiver} />
//       {/* <ChatSearchBar /> */}
//       <KeyboardAvoidingView
//         className="flex-1 bg-white"
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         keyboardVerticalOffset={90}>
//         <FlatList
//           data={messages}
//           renderItem={({item}) => (
//             <MessageBubble message={item} isMe={item.isMe} />
//           )}
//           keyExtractor={item => item.id}
//           contentContainerStyle={{paddingVertical: 10}}
//           inverted
//         />
//         <ChatInput value={input} setValue={setInput} onSend={handleSend} />
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

/* eslint-disable react-native/no-inline-styles */

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {io} from 'socket.io-client';
import {
  // useGetMessagesQuery,
  // useGetUserQuery,
  useSendMessageMutation,
} from '../redux/messageSlice.js';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import MessageBubble from '../components/MessageBubble';

import {useGetMessagesQuery, useSendGroupMessageMutation, useGetGroupMessagesQuery } from '../redux/messageSlice.js';

const socket = io('http://localhost:3000');

const SingleChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isGroup = route.params?.isGroup;
  const receiver = route.params; // in case of single chat

  console.log("group", isGroup, 'groupId', receiver?._id);
  


  const loggedUserId = useSelector(state => state.auth.user);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [sendMessage] = useSendMessageMutation();
  const [sendGroupMessage] = useSendGroupMessageMutation();

  const { data: fetchedMessages } = isGroup
    ? useGetGroupMessagesQuery(receiver?._id)
    : useGetMessagesQuery({ userA: loggedUserId.userId, userB: receiver._id });

  useEffect(() => {
    if (fetchedMessages) setMessages(fetchedMessages);

    const event = isGroup ? 'receiveGroupMessage' : 'receiveMessage';

    socket.on(event, newMessage => {
      setMessages(prev => [...prev, newMessage]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    return () => socket.off(event);
  }, [fetchedMessages, isGroup]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      senderId: loggedUserId.userId,
      message,
      timestamp: Date.now(),
    };

    if (isGroup) {
      console.log('click');
      
      newMessage.groupId = receiver?._id;
      socket.emit('sendGroupMessage', newMessage);
      setMessages(prev => [...prev, newMessage]);
      sendGroupMessage(newMessage)
      .unwrap()
      .catch(err => console.error('Group Send Failed:', err));
    } else {
      newMessage.receiverId = receiver?._id;
      socket.emit('sendMessage', newMessage);
      setMessages(prev => [...prev, newMessage]);
      sendMessage(newMessage)
      .unwrap()
      .catch(err => console.error('Send Failed:', err));
    }

    setMessage('');
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="gray" />
            </Pressable>
            <View style={styles.userInfo}>
              <Image
                source={require('../../assets/images/auth.webp')}
                style={styles.userImage}
              />
              <Text style={styles.userName}>
                {isGroup ? route.params?.name : receiver?.name}
              </Text>
            </View>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.messagesContainer}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }>
            {messages?.map((item, index) => (
              <MessageBubble
                key={index}
                item={item}
                loggedUserId={loggedUserId.userId}
                showSenderName={isGroup}
              />
            ))}
          </ScrollView>

          {/* Input */}
          <View style={[styles.inputContainer, { marginBottom: keyboardHeight ? keyboardHeight - 230 : 20 }]}>
            <Entypo name="emoji-happy" size={24} color="gray" />
            <TextInput
              placeholder="Type your message..."
              value={message}
              onChangeText={setMessage}
              style={styles.input}
            />
            <View style={styles.iconContainer}>
              <Entypo name="camera" size={24} color="gray" />
              <Feather name="mic" size={24} color="gray" />
            </View>
            <Pressable onPress={handleSendMessage} style={styles.sendButton}>
              <Text style={{ color: 'white' }}>Send</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SingleChatScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: responsiveWidth(7),
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  userImage: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: 100,
  },
  userName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'black',
  },
  messagesContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#0066b2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
});
