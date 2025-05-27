import {View, Text, Image, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const RegisterScreen = () => {
  const [text, onChangeText] = useState();
  const navigation = useNavigation();

  return (
    <View
      className="flex-1 justify-center items-center  gap-10 bg-white"
      style={{
        padding: responsiveWidth(5),
      }}>
      <Image
        source={require('../../assets/images/logo.webp')}
        style={{
          objectFit: 'cover',
        }}
      />
      <View className="gap-3 w-full">
        <View className="gap-2 w-full">
          <TextInput
            className="border border-zinc-200 rounded-md bg-zinc-50 opacity-50 w-full px-4 placeholder:text-zinc-400"
            onChangeText={onChangeText}
            value={text}
            placeholder="Enter your name.."
          />
          <TextInput
            className="border border-zinc-200 rounded-md bg-zinc-50 opacity-50 w-full px-4 placeholder:text-zinc-400"
            onChangeText={onChangeText}
            value={text}
            placeholder="Enter your email.."
          />
          <TextInput
            className="border border-zinc-200 rounded-md bg-zinc-50 opacity-50 w-full px-4 placeholder:text-zinc-400"
            onChangeText={onChangeText}
            value={text}
            placeholder="Enter your password.."
          />
        </View>
      </View>
      <Pressable className="bg-blue-500 w-full p-3 rounded-md">
        <Text className="text-white font-semibold text-center">Sign up</Text>
      </Pressable>
      <View className="gap-10 w-full">
        <View className="flex-row gap-2 justify-center items-center">
          <Entypo name="facebook" size={18} color="#3b82f6" />
          <Text className="text-blue-400 font-bold text-center">
            Log in with Facebook
          </Text>
        </View>
        <View className="flex-row items-center gap-5">
          <View
            className="bg-zinc-400 h-[1px] "
            style={{
              width: responsiveWidth(37),
            }}
          />
          <Text className="text-zinc-300 font-semibold">OR</Text>
          <View
            className="bg-zinc-400 h-[1px] "
            style={{
              width: responsiveWidth(37),
            }}
          />
        </View>
        <View className="flex-row gap-1 justify-center">
          <Text className="text-zinc-400 font-medium">
            Already have an account?
          </Text>
          <Pressable onPress={()=> navigation.navigate('Login')}>

          <Text className="text-blue-300 font-medium">Log in.</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
