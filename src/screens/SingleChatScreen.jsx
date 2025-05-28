import {View, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import {useState} from 'react';
import MessageBubble from '../components/MessageBubble';
import ChatHeader from '../components/Chatheader';
import ChatSearchBar from '../components/ChatSearchBar';
import ChatInput from '../components/ChatInput';

const messages = [
  { id: '1', text: 'Hey there!', isMe: false },
  { id: '2', text: 'Yo! How’s it going?', isMe: true },
  // ...
];

export default function SingleChatScreen() {
const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    // Handle send logic
    setInput('');
  };
  return (
    <View className="flex-1 bg-white">
      <ChatHeader />
      {/* <ChatSearchBar /> */}
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}>
        <FlatList
          data={messages}
          renderItem={({item}) => (
            <MessageBubble message={item} isMe={item.isMe} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingVertical: 10}}
          inverted
        />
        <ChatInput value={input} setValue={setInput} onSend={handleSend} />
      </KeyboardAvoidingView>
    </View>
  );
}
