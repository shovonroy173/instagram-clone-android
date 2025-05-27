import React from 'react';
import {  FlatList, Image, Pressable } from 'react-native';
import { notifications } from '../../assets/data/data';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';



const groupedNotifications = notifications.reduce((acc, item) => {
  if (!acc[item.timestamp]) acc[item.timestamp] = [];
  acc[item.timestamp].push(item);
  return acc;
}, {});

const NotificationItem = ({ item }) => (
  <ThemedView styles="flex-row items-center justify-between px-4 py-3">
    <ThemedView styles="flex-row items-center flex-1">
      <Image source={{ uri: item.user.avatar }} className="w-10 h-10 rounded-full mr-3" />
      <ThemedText styles="ThemedText-sm flex-1">
        <ThemedText styles="font-semibold">{item.user.name} </ThemedText>
        <ThemedText>{item.content}</ThemedText>
      </ThemedText>
    </ThemedView>
    {item.preview && (
      <Image source={{ uri: item.preview }} className="w-10 h-10 rounded-md ml-2" />
    )}
  </ThemedView>
);

const NotificationGroup = ({ title, data }) => (
  <ThemedView styles="pb-4">
    <ThemedText styles="px-4 py-2 ThemedText-sm  font-medium">{title}</ThemedText>
    {data.map((item) => (
      <NotificationItem key={item.id} item={item} />
    ))}
  </ThemedView>
);

const NotificationScreen = () => {
  return (
    <ThemedView styles="flex-1 ">
      <ThemedText styles=" ThemedText-xl font-bold px-4 py-4">Activity</ThemedText>
      <FlatList
        data={Object.entries(groupedNotifications)}
        keyExtractor={([group]) => group}
        renderItem={({ item: [groupTitle, groupData] }) => (
          <NotificationGroup title={groupTitle} data={groupData} />
        )}
      />
    </ThemedView>
  );
};

export default NotificationScreen;
