import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pensScreen"
        options={{
          title: 'Pens',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pen" size={28} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color }) => (
            <IconSymbol
                            size={28}
                            name="camera"
                            color={color}
                        />
          ),
        }}
      />
      <Tabs.Screen
                name="volume"
                options={{
                    title: "Volume status",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol
                            size={28}
                            name="music.note.list"
                            color={color}
                        />
                    )
                }}
            /> */}
      {/* <Tabs.Screen
        name="categoryScreen"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="parisScreen"
        options={{
          title: 'Paris',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="wineglass.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tokyoScreen"
        options={{
          title: 'Tokyo',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sun.max.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="newYorkScreen"
        options={{
          title: 'New York',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="basketball.fill" color={color} />,
        }}
      /> */}
      {/* <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="camera.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="photo.fill" color={color} />,
        }}
      />
      <Tabs.Screen
                name="accountForm"
                options={{
                    title: "Edit account",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="pencil" color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Account",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="person" color={color} />
                    )
                }}
            /> */}
    </Tabs>
  );
}
