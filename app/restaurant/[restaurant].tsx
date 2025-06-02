import { View, Text, Platform, ScrollView, TouchableOpacity, Dimensions, Image, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'
import { Ionicons } from '@expo/vector-icons'

const Restaurant = () => {

    const { restaurant } = useLocalSearchParams();
    const router = useRouter();
    const flatListRef = useRef();
    //to show the particular item data 
    const [restaurantData, setRestaurantData] = useState({}); //using obj bcz we are calling only one item data
    const [carouselData, setCarouselData] = useState({});
    const [slotsData, setSlotsData] = useState({});

    const windowWidth = Dimensions.get("window").width;
    const carouselItem = ({ item }) => {
        return (
            <View style={{ width: windowWidth - 2 }} className='h-64 relative rounded-[25px]'>
                <View
                    style={{ position: "absolute", top: "50%", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 50, padding: "5px", zIndex: 10, right: "6%" }}
                >
                    <Ionicons name='arrow-forward' size={24} color="white" />
                    <View>
                        <Image source={{uri:item.uri}} style={{ opacity: 0.5, backgroundColor: "black", marginRight: "20", marginLeft: "5", borderRadius: "25" }} className='h-64' />
                    </View>
                </View>
            </View>
        )
    }

    const getRestaurantData = async () => {
        try {
            const restaurantQuery = query(collection(db, "restaurants"), where("name", "==", restaurant));
            const restaurantSnapsShot = await getDocs(restaurantQuery)

            if (restaurantSnapsShot.empty) {
                alert("No matching restaurant found")
                console.log("No matching restaurant found")
                return;
            }

            for (const doc of restaurantSnapsShot.docs) {
                const restaurantData = doc.data();
                setRestaurantData(restaurantData);

                const carouselQuery = query(collection(db, "carousel"), where("res_id", "==", doc.ref))
                const carouselSnapShot = await getDocs(carouselQuery);
                const carouselImages = [];

                carouselSnapShot.forEach((carouselDoc) => {
                    carouselImages.push(carouselDoc.data())
                })
                setCarouselData(carouselImages)

                if (restaurantSnapsShot.empty) {
                    alert("No matching carousel found")
                    console.log("No matching carousel found")
                    return;
                }


                const slotsQuery = query(collection(db, "slots"), where("res_id", "==", doc.ref))
                const slotsSnapShot = await getDocs(slotsQuery);
                const slots = [];

                slotsSnapShot.forEach((slotDoc) => {
                    slots.push(slotDoc.data())
                })
                setSlotsData(slots)
                if (restaurantSnapsShot.empty) {
                    alert("No matching slots found")
                    console.log("No matching slots found")
                    return;
                }
            }

        }
        catch (error) {
            console.log("Error in getching data ", error)
        }

    }

    useEffect(() => {
        getRestaurantData();
    }, [])
    return (
        <SafeAreaView
            style={[{ backgroundColor: "#2b2b2b" },
            Platform.OS == "android" && { paddingBottom: 55 },
            Platform.OS == "ios" && { paddingBottom: 20 }
            ]}>
            <ScrollView className='h-full'>
                <View className='flex-1 flex-row gap-3 p-2'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#f49b33" />
                    </TouchableOpacity>
                    <Text className='text-xl text-[#f49b33] mr-2 font-semibold'>{restaurant}</Text>
                    <View className='border-b-2 border-[#f49b33]' />
                </View>

                <View className='h-64 max-w[98%] mx-2 rounded-[25px]'>
                    <FlatList
                        ref={flatListRef}
                        data={carouselData}
                        renderItem={carouselItem}
                        horizontal
                        scrollEnabled={true}
                        style={{ borderRadius: 25 }}
                        showsHorizontalScrollIndicator={false}
                    />

                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default Restaurant