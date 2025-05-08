import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs } from 'expo-router'
import { Colors } from "@/assets/Colors"
import { Ionicons } from "@expo/vector-icons"
import * as SystemUI from 'expo-system-ui';

const TabLayout = () => {
    useEffect(() => {
        SystemUI.setBackgroundColorAsync(Colors.SECONDARY); 
    }, []);

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarInactiveTintColor: Colors.dark.text,
            tabBarStyle: {
                backgroundColor: Colors.SECONDARY,
                paddingBottom: 14,
                height: 75
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "bold"
            }
        }}>
            <Tabs.Screen
                name='home'
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='history'
                options={{
                    title: "History",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="time" size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-sharp" size={24} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}

export default TabLayout
