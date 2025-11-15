import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhotosScreen() {
  return (
    <LinearGradient
      colors={['#a2d2ff', '#ffc8dd']}
      className="flex-1 justify-center items-center"
    >
      <SafeAreaView className="flex-1 justify-center items-center">
        <StatusBar barStyle="dark-content" />
        <Text className="text-3xl font-bold text-white">Photos Screen</Text>
        <Text className="text-lg text-white/80 mt-2">Content coming soon!</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}