import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInfo from '../components/ProfileInfo';
import StoryHighlights from '../components/StoryHighlights';
import TaggedGrid from '../components/TaggedGrid';
import PostGrid from '../components/PostGrid';
import ProfileTabs from '../components/ProfileTabs';

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState('posts');

  return (
    <FlatList
      data={[]}
      renderItem={null}
      keyExtractor={() => Math.random().toString()}
      ListHeaderComponent={
        <View>
          <ProfileHeader />
          <ProfileInfo />
          <StoryHighlights />
          <ProfileTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {selectedTab === 'posts' ? <PostGrid /> : <TaggedGrid />}
        </View>
      }
      contentContainerStyle={{ paddingBottom: 80 }}
    />
  );
};

export default ProfileScreen;
