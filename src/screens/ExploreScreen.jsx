import React, {useState} from 'react';
import {View} from 'react-native';
import MasonryList from '../components/MasonryList';
import {sampleMasonryData} from '../../assets/data/data';
import ThemedView from '../utils/ThemedView';
import SearchBar from '../components/SearchBar';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const ExploreScreen = () => {
  const [search, setSearch] = useState('');

  const handleItemPress = item => {
    console.log('Item pressed:', item.title);
    // navigation.navigate('DetailScreen', { item });
  };

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingTop: responsiveHeight(2),
        paddingHorizontal: responsiveHeight(1),
        gap: responsiveHeight(2),
      }}>
      <SearchBar value={search} onChangeText={setSearch} />

      <MasonryList
        data={sampleMasonryData}
        numColumns={3}
        onItemPress={handleItemPress}
      />
    </ThemedView>
  );
};

export default ExploreScreen;
