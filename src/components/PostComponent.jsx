import {View, Text, Image, FlatList} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const renderItem = ({item}) => {
  return (
    <Image
      source={item}
      style={{
        objectFit: 'cover',
        width: responsiveWidth(100),
        height: responsiveWidth(60),
      }}
    />
  );
};

const PostComponent = ({post}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewRef = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      // console.log('data', viewableItems);

      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  return (
    <ThemedView>
      <ThemedView
        styles="flex-row items-center justify-between"
        style={{
          padding: responsiveWidth(5),
        }}>
        <ThemedView styles="flex-row items-center gap-2">
          <Image
            source={require('../../assets/images/auth.webp')}
            style={{
              objectFit: 'cover',
              width: responsiveWidth(10),
              height: responsiveWidth(10),
              borderRadius: 100,
            }}
          />
          <ThemedView>
            <ThemedView styles="flex-row items-center gap-2">
              <ThemedText>{post.username}</ThemedText>
              <MaterialCommunityIcons
                name="check-decagram"
                size={18}
                color="#3b82f6"
              />
            </ThemedView>
            <ThemedText>{post.address}</ThemedText>
          </ThemedView>
        </ThemedView>
        <MaterialCommunityIcons name="dots-horizontal" size={18} />
      </ThemedView>
      <View className="relative">
        {/* posts component */}
        <FlatList
          data={post.images}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onViewableItemsChanged={onViewRef}
          viewabilityConfig={viewConfigRef.current}
        />
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 10,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}>
          <Text style={{color: 'white', fontSize: 12}}>
            {activeIndex + 1}/{post.images.length}
          </Text>
        </View>
      </View>
      <ThemedView
        styles="flex-row justify-between items-center"
        style={{
          paddingHorizontal: responsiveWidth(5),
          paddingVertical: responsiveWidth(2),
        }}>
        <ThemedView styles="flex-row justify-between items-center w-[55%]">
          <ThemedView styles="flex-row gap-2 items-center">
            <Feather name="heart" size={24} />
            <Feather name="message-circle" size={24} />
            <Feather name="send" size={24} />
          </ThemedView>
          <View
            style={{

              flexDirection: 'row',
              gap: 6,
              paddingVertical: 10,
            //   backgroundColor: 'red',
            }}>
            {post.images.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: activeIndex === index ? '#000' : '#ccc',
                }}
              />
            ))}
          </View>
        </ThemedView>

        <Feather name="bookmark" size={24} />
      </ThemedView>
    </ThemedView>
  );
};

export default PostComponent;
