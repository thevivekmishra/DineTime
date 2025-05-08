import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SystemUI from 'expo-system-ui';
import "@/global.css"
import { Colors } from '@/assets/Colors';
import { router, useRouter } from 'expo-router';
import { Formik } from 'formik';
import authSchema from '../utils/authSchema';


const Signup = () => {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(Colors.SECONDARY);
  }, []);

  const router = useRouter();

  const handleSignup = () => {

  }
  return (
    <SafeAreaView className='flex-1 bg-[#2b2b2b] '>
      <ScrollView >
        <View className='flex justify-center items-center m-2'>
          <Image source={require("@/assets/images/dinetimelogo.png")} style={{ width: 300, height: 300 }} />

          <View className='justify-center items-center my-[-50px]'>
            <Text className='text-white text-lg mb-10'>Let's get started</Text>
          </View>
          <View className='w-5/6'>


            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={authSchema}
              onSubmit={handleSignup}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className="w-full">
                  <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                  <TextInput
                    className="h-12 border border-white text-white rounded px-2"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                  />

                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.email}
                    </Text>
                  )}
                  <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                  <TextInput
                    className="h-12 border border-white text-white rounded px-2"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                  />

                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.password}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-2 my-2 bg-[#f49b33]  text-black rounded-lg mt-10"
                  >
                    <Text className="text-lg font-semibold text-center">
                      Create Account
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <View className='flex flex-row mt-7 justify-center'>
              <Text className='text-white'>Already have an account ? </Text>
              <Text className='text-[#f49b33]' onPress={() => router.push("/signin")}>Sign In</Text>
            </View>

          </View>


          <View>
            <Text className='text-center text-base text-white font-semibold my-4'>
              <View className='w-24 h-3 border-b-2 border-[#f49b33] p-2 mb-7' /> or {" "}
              <View className='w-24 h-3 border-b-2 border-[#f49b33] p-2 mb-7' />
            </Text>
          </View>


          <TouchableOpacity
            onPress={() => router.push("/home")}
            className='flex flex-row items-center justify-center'>
            <Text className='text-white'>Be a  </Text>
            <Text className='text-[#f49b33]'>Guest User</Text>
          </TouchableOpacity>

          <View className='flex-1'>
            <Image source={require("@/assets/images/Frame.png")} resizeMode='contain' className='w-[450px]' />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default Signup