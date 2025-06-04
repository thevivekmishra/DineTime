import { View, Text, Platform, ScrollView, TouchableOpacity, Dimensions, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const Restaurant = () => {
    const { restaurant } = useLocalSearchParams(); // Get restaurant name from params
    const router = useRouter();
    const flatListRef = useRef();

    // State for restaurant, carousel, and slots data
    const [restaurantData, setRestaurantData] = useState(null);
    const [carouselData, setCarouselData] = useState([]);
    const [slotsData, setSlotsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const windowWidth = Dimensions.get('window').width;

    const [currentIndex, setCurrentIndex] = useState(0)

    const handlePrevImage = () => {
        const carouselLength = carouselData.length;

        if (currentIndex < carouselLength - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        } else {
            const nextIndex = 0;
            setCurrentIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
    };

    const handleNextImage = () => {
        const carouselLength = carouselData.length;

        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
        } else {
            const prevIndex = carouselLength - 1;
            setCurrentIndex(prevIndex);
            flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
        }
    };

    // Carousel item rendering
    const carouselItem = ({ item }) => (
        <View style={{ width: windowWidth - 2, height: 256, position: 'relative', borderRadius: 25 }}>
            <View
                style={{
                    position: 'absolute',
                    top: '50%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 50,
                    padding: 5,
                    zIndex: 10,
                    left: '2%',
                }}
            >
                <Ionicons onPress={handleNextImage} name="arrow-back" size={24} color="white" />
            </View>


            <View
                style={{
                    position: 'absolute',
                    top: '50%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 50,
                    padding: 5,
                    zIndex: 10,
                    right: '6%',
                }}
            >
                <Ionicons onPress={handlePrevImage} name="arrow-forward" size={24} color="white" />
            </View>

            <View style={{ position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", left: "50%", bottom: 15, zIndex: 10, transform: [{ translateX: -50 }] }}>
                {carouselData.map((_, i) => (
                    <View key={i}
                        className={`h-2 w-2 p-1 mx-1 bg-white rounded-full ${i == currentIndex && "h-4 w-4 rounded-full"}`} />
                ))}

            </View>

            <Image
                source={{ uri: item }}
                style={{
                    opacity: 0.5,
                    backgroundColor: "black",
                    marginRight: 20,
                    marginLeft: 5,
                    borderRadius: 25,
                }}
                className="h-full"
            />
        </View>
    );

    // Fetch restaurant, carousel, and slots data from Firebase
    const getRestaurantData = async () => {
        try {
            setLoading(true);
            const restaurantQuery = query(collection(db, 'restaurants'), where('name', '==', restaurant));
            const restaurantSnapsShot = await getDocs(restaurantQuery);

            if (restaurantSnapsShot.empty) {
                alert('No matching restaurant found');
                console.log('No matching restaurant found');
                setLoading(false);
                return;
            }

            // Loop through the documents and fetch restaurant, carousel, and slots data
            for (const doc of restaurantSnapsShot.docs) {
                const restaurantData = doc.data();
                setRestaurantData(restaurantData);

                const carouselQuery = query(collection(db, 'carousel'), where('res_id', '==', doc.ref));
                const carouselSnapShot = await getDocs(carouselQuery);
                const carouselImages = [];

                carouselSnapShot.forEach((carouselDoc) => {
                    carouselImages.push(...carouselDoc.data().images); // Flattening the images array
                });
                setCarouselData(carouselImages);

                const slotsQuery = query(collection(db, 'slots'), where('ref_id', '==', doc.ref));
                const slotsSnapShot = await getDocs(slotsQuery);
                const slots = [];

                slotsSnapShot.forEach((slotDoc) => {
                    slots.push(...slotDoc.data().slot); // Flattening the slot array
                });
                setSlotsData(slots);
            }
        } catch (error) {
            console.log('Error fetching data', error);
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
    };

    useEffect(() => {
        getRestaurantData();
    }, []);

    // console.log(restaurantData, carouselData, slotsData)
    if (loading) {
        return (
            <SafeAreaView
                style={[
                    { backgroundColor: '#2b2b2b', flex: 1 },
                    Platform.OS === 'android' && { paddingBottom: 55 },
                    Platform.OS === 'ios' && { paddingBottom: 20 },
                ]}
            >
                <ActivityIndicator size="large" color="#f49b33" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
            </SafeAreaView>
        );
    }

    const handleLocation = () => {

    }

    return (
        <SafeAreaView
            style={[
                { backgroundColor: '#2b2b2b', flex: 1 },
                Platform.OS === 'android' && { paddingBottom: 55 },
                Platform.OS === 'ios' && { paddingBottom: 20 },
            ]}
        >
            <ScrollView style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', gap: 8, padding: 16 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#f49b33" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, color: '#f49b33', fontWeight: '600' }}>{restaurant}</Text>
                    <View style={{ borderBottomWidth: 2, borderColor: '#f49b33', flex: 1 }} />
                </View>

                {/* Carousel */}
                {carouselData.length > 0 && (
                    <View style={{ height: 256, maxWidth: '98%', marginHorizontal: 8, borderRadius: 25 }}>
                        <FlatList
                            ref={flatListRef}
                            data={carouselData}
                            renderItem={carouselItem}
                            horizontal
                            scrollEnabled={false}
                            style={{ borderRadius: 25 }}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}

                {/* Slots
                {slotsData.length > 0 && (
                    <View style={{ padding: 16 }}>
                        <Text style={{ color: '#f49b33', fontSize: 24, fontWeight: 'bold' }}>Available Slots</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 16 }}>
                            {slotsData.map((slot, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        backgroundColor: '#fb9b33',
                                        padding: 10,
                                        margin: 8,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 16 }}>{slot}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )} */}

                <View className='flex-1 flex-row m-2 p-2 gap-2 items-center text-center'>
                    <Ionicons
                        name='location-sharp'
                        size={34}
                        color="#f49b33"
                    />
                    <Text className='text-white max-w-[75%] text-lg '>{restaurantData.address} | {" "}
                        <Text onPress={handleLocation} className='underline flex italic text-[#f49b33] font-semibold '>Get Direction</Text>

                    </Text>
                </View>

                
                <View className='flex-1 flex-row m-2 p-2 ml-3 gap-2 items-center text-center'>
                    <Ionicons
                        name='time'
                        size={28}
                        color="#f49b33"
                    />
                    <Text className='text-white max-w-[75%] text-lg'>{restaurantData.opening} - {restaurantData.closing} 

                    </Text>
                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

export default Restaurant;
