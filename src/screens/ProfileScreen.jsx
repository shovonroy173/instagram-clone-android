import React, { useState } from 'react';
import { Button, FlatList, View } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInfo from '../components/ProfileInfo';
import StoryHighlights from '../components/StoryHighlights';
import TaggedGrid from '../components/TaggedGrid';
import PostGrid from '../components/PostGrid';
import ProfileTabs from '../components/ProfileTabs';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authReducer';

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState('posts');
const dispatch = useDispatch();
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
          <Button title='Logout' onPress={()=> dispatch(logout())}  />
          <ProfileTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {selectedTab === 'posts' ? <PostGrid /> : <TaggedGrid />}
        </View>
      }
      contentContainerStyle={{ paddingBottom: 80 }}
    />
  );
};

export default ProfileScreen;
