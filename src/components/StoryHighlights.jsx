import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';

const stories = [
  { id: '1', name: 'Trip', uri: 'https://i.pravatar.cc/100' },
  { id: '2', name: 'Food', uri: 'https://i.pravatar.cc/101' },
  { id: '3', name: 'Work', uri: 'https://i.pravatar.cc/102' },
];

const StoryHighlights = () => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 px-4">
    {stories.map(story => (
      <View key={story.id} className="items-center mr-4">
        <Image source={{ uri: story.uri }} className="w-16 h-16 rounded-full" />
        <Text className="text-xs mt-1">{story.name}</Text>
      </View>
    ))}
  </ScrollView>
);

export default StoryHighlights;
