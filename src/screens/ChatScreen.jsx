import {FlatList, Text} from 'react-native';
import {chats} from '../../assets/data/data.js';
import ChatListItem from '../components/ChatListItem.jsx';
import ChatSearchBar from '../components/ChatSearchBar.jsx';
import ThemedView from '../utils/ThemedView.js';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const ChatScreen = () => {
  const chat = false;
  return (
    <ThemedView
      styles="flex-1"
      style={{
        padding: responsiveWidth(4),
        gap: responsiveHeight(2),
      }}>
      <ChatSearchBar />
      {chat ? (
        <FlatList
          data={chats}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ChatListItem item={item} />}
          className=""
        />
      ) : (
        <Text>No chats till now!!</Text>
      )}
    </ThemedView>
  );
};

export default ChatScreen;
