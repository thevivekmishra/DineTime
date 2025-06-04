import { View, Text, Image, ScrollView, ImageBackground, Platform, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur';
import { restaurants } from '@/store/restaurants';
import uploadData from '@/config/bulkUpload';
import { collection, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useRouter } from 'expo-router';

const Home = () => {

  // useEffect(() => {
  //   uploadData();
  // }, [])

  // uploadData();

  const [restaurants, setRestaurants] = useState([])

  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);

    res.forEach((item) => {
      setRestaurants((prev) => [...prev, item.data()])
    })
  }

  useEffect(()=>{
    getRestaurants();
  },[])


  const router = useRouter();

  const renderItem = ({ item }) => {
    // console.log(item); 
    return (
      <TouchableOpacity onPress={()=>router.push(`/restaurant/${item.name}`)} className='bg-[#5f5f5f] max-h-86 max-w-xs justify-center rounded-lg p-4 mx-4 shadow-md'>
        <Image
          resizeMode='cover'
          source={{ uri: item.image }}
          style={{ height: 120, width: 250, marginVertical: 8, borderRadius: 12 }}
        />
        <Text className='text-white font-bold text-lg mb-2'>{item.name}</Text>
        <Text className='text-white text-base mb-2'>{item.address}</Text>
        <Text className='text-white text-base mb-2'>Open:-{item.opening} Close:-{item.closing}</Text>
      </TouchableOpacity>
    );
  };

  return (
<SafeAreaView style={[{ backgroundColor: "#2b2b2b", flex: 1 }, Platform.OS == "android" && { paddingBottom:1 }]}>
      <View className='flex items-center'>
        <View className='bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center p-1 m-3'>
          <View className='flex flex-row items-center justify-center text-center '>
            <Text className='text-white'>Welcome to </Text>
            <Image source={require("@/assets/images/dinetimelogo.png")} className='w-24 h-16 mt-1' />
          </View>
        </View>
      </View>

      <ScrollView>
        <ImageBackground source={require("@/assets/images/homeBanner.png")} resizeMode='cover'
          className='w-full h-52 items-center justify-center '>

          {/* BlurView not supporting in android */}
          <BlurView intensity={Platform.OS === "android" ? 100 : 50} tint='dark'>
            <Text className='text-3xl font-bold text-white justify-center items-center'>Dine with your loved ones</Text>
          </BlurView>
        </ImageBackground>


        <View className='p-4'>
          <Text className='text-white font-bold text-3xl'>Special Discount %</Text>
        </View>

        {
          restaurants.length > 0 ?
            <FlatList
              data={restaurants}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ padding: 16 }} /> : <ActivityIndicator animating color={"#fb9b33"} />
        }


        <View className='p-4'>
          <Text className='text-[#fb9b33] font-bold text-3xl'>Our Restaurants</Text>
        </View>

        {
          restaurants.length > 0 ?
            <FlatList
              data={restaurants}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ padding: 16 }} /> : <ActivityIndicator animating color={"#fb9b33"} />
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home