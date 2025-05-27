import {View, Text, Image, FlatList, Pressable} from 'react-native';
import React from 'react';
import ThemedView from '../utils/ThemedView';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {storyData} from '../../assets/data/data';
import Feather from 'react-native-vector-icons/Feather';
import ThemedText from '../utils/ThemedText';

const StoryComponent = () => {
  const renderItem = ({item}) => {
    if (item.isUploader) {
      return (
        <Pressable className="items-center">
          <View
            style={{
              width: responsiveWidth(20),
              height: responsiveWidth(20),
              borderRadius: 100,
              backgroundColor: '#f3f4f6',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather name="plus" size={24} />
          </View>
          <ThemedText>Your Story</ThemedText>
        </Pressable>
      );
    } else {
      return (
        <ThemedView styles="items-center">
          <Image
            source={item.image}
            style={{
              objectFit: 'cover',
              width: responsiveWidth(20),
              height: responsiveWidth(20),
              borderRadius: 100,
            }}
          />
          <ThemedText>{item.name}</ThemedText>
        </ThemedView>
      );
    }
  };

  return (
    <ThemedView style={{
        paddingHorizontal: responsiveWidth(5)
      }}>
      <FlatList
        data={storyData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4"
      />
  </ThemedView>
  );
};

export default StoryComponent;
