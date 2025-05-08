import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SystemUI from 'expo-system-ui';
import "@/global.css"
import { Colors } from '@/assets/Colors';
import { router, useRouter } from 'expo-router';

const index = () => {
    useEffect(() => {
        SystemUI.setBackgroundColorAsync(Colors.SECONDARY);
    }, []);

    const router = useRouter();
    return (
        <SafeAreaView className='flex-1 bg-[#2b2b2b] '>
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className='flex justify-center items-center m-2'>
                    <Image source={require("@/assets/images/dinetimelogo.png")} style={{ width: 300, height: 300 }} />
                    <View className='w-3/4'>
                        <TouchableOpacity
                            onPress={() => router.push("/signup")}
                            className='bg-[#f49b33] p-2 rounded-lg my-4'>
                            <Text className='text-center text-lg font-semibold'>Sign UP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.push("/home")}
                            className='bg-[#2b2b2b]  border border-[#f49b33] p-2 rounded-lg'>
                            <Text className='text-center text-[#f49b33] text-lg font-semibold'>Guest User</Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        <Text className='text-center text-base text-white font-semibold my-4'>
                            <View className='w-24 h-3 border-b-2 border-[#f49b33] p-2 mb-7' /> or {" "}
                            <View className='w-24 h-3 border-b-2 border-[#f49b33] p-2 mb-7' />
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => router.push("/signin")}
                        className='flex flex-row items-center justify-center'>
                        <Text className='text-white'>Already a User ?  </Text>
                        <Text className='text-[#f49b33]'>Sign In</Text>
                    </TouchableOpacity>

                    <View className='flex-1 mt-14'>
                        <Image source={require("@/assets/images/Frame.png")} resizeMode='contain' className='w-[450px]'/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default index