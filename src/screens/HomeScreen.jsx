import React from 'react';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';
import Feather from 'react-native-vector-icons/Feather';
import {Image, ScrollView} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import StoryComponent from '../components/StoryComponent';
import PostsComponent from '../components/PostsComponent';

const HomeScreen = () => {
  return (
    <ScrollView>
      <ThemedView
        styles=""
        style={{
          paddingVertical: responsiveWidth(5),
          gap: responsiveHeight(2),
        }}>
        {/* Header */}

        <ThemedView
          styles="flex-row justify-between"
          style={{
            paddingHorizontal: responsiveWidth(5),
          }}>
          {/* <Feather name="camera" size={24} /> */}
          <Image
            source={require('../../assets/images/logo.webp')}
            style={{
              objectFit: 'contain',
              width: responsiveWidth(40),
              height: responsiveHeight(6),
            }}
          />
          <Feather name="send" size={24} />
        </ThemedView>

        {/* Story */}

        <StoryComponent />

        {/* Post */}
        <PostsComponent />
      </ThemedView>
    </ScrollView>
  );
};

export default HomeScreen;
