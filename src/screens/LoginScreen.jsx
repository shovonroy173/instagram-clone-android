import {View, Text, Image, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {loginSchema} from '../../assets/data/data';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSelector} from 'react-redux';
import {useLoginMutation} from '../redux/authSlice';

const LoginScreen = () => {
  const token = useSelector(state => state.auth.token);
  console.log ("LINE AT LoginSAcreen.js", token);
  
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });
  const navigation = useNavigation();
  const [login] = useLoginMutation();

  const onSubmit = async data => {
    console.log('Login form data:', data);
    // Call your login API here
    try {
      const res = await login(data).unwrap();
      console.log('LINE AT 21', res);
      navigation.navigate('BottomNavigator', {screen: 'Home'});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="flex-1">
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
        {token ? (
          <Image
            source={require('../../assets/images/auth.webp')}
            style={{
              objectFit: 'cover',
              width: responsiveWidth(20),
              height: responsiveWidth(20),
              borderRadius: 100,
            }}
          />
        ) : (
          <View className="gap-3 w-full">
            <View className="gap-2 w-full">
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({field: {onChange, value}}) => (
                  <TextInput
                    className="border border-zinc-200 rounded-md bg-zinc-50 opacity-50 w-full px-4 placeholder:text-zinc-400"
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email.."
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />

              <Text className="text-red-500 text-sm">
                {errors.email && errors.email.message}
              </Text>

              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({field: {onChange, value}}) => (
                  <TextInput
                    className="border border-zinc-200 rounded-md bg-zinc-50 opacity-50 w-full px-4 placeholder:text-zinc-400"
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your password.."
                    secureTextEntry
                  />
                )}
              />

              <Text className="text-red-500 text-sm">
                {errors.password && errors.password.message}
              </Text>
            </View>
            <View className="w-full items-end ">
              <Text className="text-blue-300 font-bold text-sm ">
                Forgot Password?
              </Text>
            </View>
          </View>
        )}

        <Pressable
          className="bg-blue-500 w-full p-3 rounded-md"
          onPress={handleSubmit(onSubmit)}>
          <Text className="text-white font-semibold text-center">Log in</Text>
        </Pressable>
        <View className="gap-10 w-full">
          <View className="flex-row gap-2 justify-center items-center">
            {token ? (
              <Text className="text-blue-400 font-bold text-center">
                Switch account
              </Text>
            ) : (
              <>
                <Entypo name="facebook" size={18} color="#3b82f6" />
                <Text className="text-blue-400 font-bold text-center">
                  Log in with Facebook
                </Text>
              </>
            )}
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
              Don't have an account?
            </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text className="text-blue-300 font-medium">Sign up.</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
