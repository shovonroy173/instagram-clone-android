import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const { width: screenWidth } = Dimensions.get('window');

const MasonryList = ({ 
  data = [], 
  numColumns = 2, 
  onItemPress = null,
  containerStyle = {},
  itemStyle = {},
}) => {
  const [columns, setColumns] = useState([]);
  const [imageHeights, setImageHeights] = useState({});

  const gap = 10;
  const itemWidth = (screenWidth - gap * (numColumns + 1)) / numColumns;

  useEffect(() => {
    if (data.length > 0) {
      distributeItems();
    }
  }, [data, numColumns]);

  const generateHeight = (index) => {
    const patterns = [180, 240, 200, 300, 160, 280, 220, 320, 190, 260];
    return patterns[index % patterns.length];
  };

  const distributeItems = () => {
    const newColumns = Array.from({ length: numColumns }, () => []);
    const columnHeights = Array.from({ length: numColumns }, () => 0);
    const newImageHeights = {};

    data.forEach((item, index) => {
      const itemId = item.id || `item_${index}`;
      const height = generateHeight(index);
      newImageHeights[itemId] = height;

      const shortestColumnIndex = columnHeights.reduce((minIdx, height, idx) => 
        height < columnHeights[minIdx] ? idx : minIdx, 0
      );

      newColumns[shortestColumnIndex].push({
        ...item,
        itemId,
        height,
        index,
      });

      columnHeights[shortestColumnIndex] += height + gap;
    });

    setColumns(newColumns);
    setImageHeights(newImageHeights);
  };

  const handleItemPress = (item) => {
    if (onItemPress) {
      onItemPress(item);
    }
  };

  const renderItem = (item) => (
    <TouchableOpacity
      key={item.itemId}
      className="rounded-xl bg-gray-100 shadow-md overflow-hidden "
      style={[{ width: itemWidth, marginBottom: gap }, itemStyle]}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.uri || item.url }}
        style={{ height: item.height, width: '100%', backgroundColor: '#e5e7eb' }}
        resizeMode="cover"
      />

      {/* {item.overlay && (
        <View className="absolute bottom-0 left-0 right-0 bg-black/60 p-3">
          {item.title && (
            <Text className="text-white text-sm font-semibold leading-5" numberOfLines={2}>
              {item.title}
            </Text>
          )}
        </View>
      )} */}

      {item.likes && (
        <View className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">♥ {item.likes}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderColumn = (columnItems, columnIndex) => (
    <View key={columnIndex} className="flex-1 items-center">
      {columnItems.map(renderItem)}
    </View>
  );

  return (
    <ScrollView 
      className="flex-1 bg-white"
      style={containerStyle}
      showsVerticalScrollIndicator={false}
      // contentContainerStyle={{ paddingVertical: responsiveHeight(2), paddingHorizontal: responsiveHeight(1) }}
    >
      <View className="flex-row  justify-between">
        {columns.map(renderColumn)}
      </View>
    </ScrollView>
  );
};

export default MasonryList;
