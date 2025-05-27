import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { postData } from '../../assets/data/data'
import PostComponent from './PostComponent'

const PostsComponent = () => {
  return (
    <FlatList
    data={postData}
    keyExtractor={(item)=> item.id}
    renderItem={({ item }) => <PostComponent post={item} />}
    vertical
    showsVerticalScrollIndicator={false}
    />
  )
}

export default PostsComponent