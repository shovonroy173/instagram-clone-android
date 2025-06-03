
import {memo} from 'react';
import {Text} from 'react-native';
import {Pressable} from 'react-native';

const formatTime = time => {
  const options = {hour: 'numeric', minute: 'numeric'};
  return new Date(time).toLocaleString('en-US', options);
};

const MessageBubble = memo(({item, loggedUserId}) => (
  <Pressable
  style={{
    alignSelf:
      item?.senderId === loggedUserId ? 'flex-end' : 'flex-start',
    backgroundColor:
      item?.senderId === loggedUserId ? '#DCF8C6' : '#e7e8ea',
    padding: 8,
    maxWidth: '60%',
    borderRadius: 7,
    margin: 10,
    }}>
    <Text style={{fontSize: 13, textAlign: 'left'}}>{item.message}</Text>
    <Text
      style={{
        textAlign: 'right',
        fontSize: 9,
        color: 'gray',
        marginTop: 4,
      }}>
      {formatTime(item.timestamp)}
    </Text>
  </Pressable>
));

export default MessageBubble;