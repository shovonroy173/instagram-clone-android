import React from 'react';
import { Image, FlatList, Dimensions } from 'react-native';

const images = Array.from({ length: 12 }, (_, i) => ({
  id: i.toString(),
  uri: `https://picsum.photos/id/${i + 100}/300/300`,
}));

const size = Dimensions.get('window').width / 3;

const PostsGrid = () => (
  <FlatList
    data={images}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <Image source={{ uri: item.uri }} style={{ width: size, height: size }} />
    )}
    numColumns={3}
    scrollEnabled={false}
  />
);

export default PostsGrid;
