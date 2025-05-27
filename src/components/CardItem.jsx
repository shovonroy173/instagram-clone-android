// components/CardItem.js
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const CardItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={item.uri} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
objectFit: 'cover'
  },
  title: {
    padding: 6,
    fontSize: 13,
    fontWeight: '500',
  },
});

export default CardItem;
