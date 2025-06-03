import {FlatList, Text, ActivityIndicator, View, Pressable} from 'react-native';
import ChatListItem from '../components/ChatListItem.jsx';
import ChatSearchBar from '../components/ChatSearchBar.jsx';
import ThemedView from '../utils/ThemedView.js';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  useGetChatsQuery,
  useGetGroupsQuery,
  useSearchProfilesByNameQuery,
} from '../redux/userSlice.js';
import {useState} from 'react';
import {useSelector} from 'react-redux';

// const ChatScreen = () => {
//   const [searchName, setSearchName] = useState('');
//   const loggedUserId = useSelector(state => state.auth.user);

//   const {
//     data: chat,
//     isError,
//     isLoading,
//   } = useSearchProfilesByNameQuery(searchName, {
//     skip: !searchName,
//   });
//     const filteredChat = chat?.filter(profile => profile._id !== loggedUserId?.userId);

//   console.log('LINE AT 16', searchName, chat, filteredChat, loggedUserId);

//   return (
//     <ThemedView
//       styles="flex-1"
//       style={{
//         padding: responsiveWidth(4),
//         gap: responsiveHeight(2),
//       }}>

//       <ChatSearchBar onSearch={setSearchName} />

//       {/* Loading State */}
//       {isLoading && (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#007AFF" />
//         </View>
//       )}

//       {/* Error State */}
//       {isError && (
//         <Text className="text-red-500 text-center">Failed to load chats.</Text>
//       )}

//       {/* Loaded State */}
//       {!isLoading && filteredChat?.length > 0 && (
//         <FlatList
//           data={filteredChat}
//           keyExtractor={item => item.id}
//           renderItem={({item}) => <ChatListItem item={item} />}
//           className=""
//         />
//       )}

//       {/* No Results */}
//       {!isLoading && !isError && (!filteredChat || filteredChat.length === 0) && (
//         <Text className="text-center text-gray-500">No chats found!</Text>
//       )}
//     </ThemedView>
//   );
// };

const ChatScreen = () => {
  const [tab, setTab] = useState('chats'); // 'chats' or 'groups'
  const [searchName, setSearchName] = useState('');
  const loggedUserId = useSelector(state => state.auth.user);

  const {data: chat = []} = useSearchProfilesByNameQuery(searchName, {
    skip: !searchName,
  });

  const {data: groups = [], isLoading: loadingGroups} = useGetGroupsQuery(
    loggedUserId?.userId,
  );
  const {data: chats = [], isLoading: loadingChats} = useGetChatsQuery(
    loggedUserId?.userId,
  );
  console.log('chats', chats, loggedUserId?.userId);

  const filteredChat = chat?.filter(
    profile => profile._id !== loggedUserId?.userId,
  );

  return (
    <ThemedView style={{padding: responsiveWidth(4), gap: responsiveHeight(2)}}>
      <View className="flex-row justify-around mb-2">
        <Pressable onPress={() => setTab('chats')}>
          <Text className={`text-lg ${tab === 'chats' ? 'font-bold' : ''}`}>
            Chats
          </Text>
        </Pressable>
        <Pressable onPress={() => setTab('groups')}>
          <Text className={`text-lg ${tab === 'groups' ? 'font-bold' : ''}`}>
            Groups
          </Text>
        </Pressable>
      </View>

      {tab === 'chats' && (
        <>
          <ChatSearchBar onSearch={setSearchName} />
          <FlatList
            data={chats}
            keyExtractor={item => item._id}
            renderItem={({item}) => <ChatListItem item={item} />}
          />
          <FlatList
            data={filteredChat}
            keyExtractor={item => item._id}
            renderItem={({item}) => <ChatListItem item={item} />}
          />
        </>
      )}

      {tab === 'groups' && (
        <>
          {loadingGroups ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={groups}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <ChatListItem item={{...item, isGroup: true}} />
              )}
            />
          )}
        </>
      )}
    </ThemedView>
  );
};

export default ChatScreen;
