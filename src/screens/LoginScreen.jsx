import {View, Text, Image, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const LoginScreen = () => {
  const [text, onChangeText] = useState();
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
            placeholder="Enter your email.."
          />
          <TextInput
            className="border border-zinc-200 rounded-md bg-zinc-50 opacity-50 w-full px-4 placeholder:text-zinc-400"
            onChangeText={onChangeText}
            value={text}
            placeholder="Enter your password.."
          />
        </View>
        <View className="w-full items-end ">
          <Text className="text-blue-300 font-bold text-sm ">
            Forgot Password?
          </Text>
        </View>
      </View>
      <Pressable className="bg-blue-500 w-full p-3 rounded-md">
        <Text className="text-white font-semibold text-center">Log in</Text>
      </Pressable>
      <View className="gap-10 w-full">
        <Text className="text-blue-400 font-bold text-center">
          Log in with Facebook
        </Text>
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
            Don't have an account?
          </Text>
          <Text className="text-blue-300 font-medium">Sign up.</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
