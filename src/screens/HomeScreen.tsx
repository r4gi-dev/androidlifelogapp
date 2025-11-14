import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const Card = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <BlurView intensity={80} tint="light" className="rounded-2xl overflow-hidden mb-6">
    <TouchableOpacity className="p-6">
      <View className="flex-row items-center mb-4">
        {icon}
        <Text className="text-xl font-bold text-gray-800 ml-3">{title}</Text>
      </View>
      <View>{children}</View>
    </TouchableOpacity>
  </BlurView>
);

export default function HomeScreen() {
  async function checkDbConnection() {
    try {
      const response = await fetch('http://192.168.3.100:3001/test');
      const data = await response.json();
      console.log('DB Response:', data);
      alert('DB Connection Test Successful! Check console for details.');
    } catch (err) {
      console.error('Failed to connect to API:', err);
      alert('DB Connection Test Failed! Check console for details.');
    }
  }

  return (
    <LinearGradient
      colors={['#a2d2ff', '#ffc8dd']}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" />
        <ScrollView className="p-6">
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-4xl font-extrabold text-white shadow-sm">Welcome!</Text>
              <Text className="text-lg text-white/80">Your personal LifeLog</Text>
            </View>
            <View className="w-16 h-16 bg-white/30 rounded-full" />
          </View>

          <Card icon={<Ionicons name="cloud-done-outline" size={24} color="#333" />} title="API Connection Test">
            <Text className="text-gray-700 mb-4">Press the button to test the connection to the API server.</Text>
            <TouchableOpacity
              className="bg-white/50 py-3 rounded-lg"
              onPress={checkDbConnection}
            >
              <Text className="text-gray-800 text-center font-bold">Test Connection</Text>
            </TouchableOpacity>
          </Card>

          <Card icon={<MaterialIcons name="book" size={24} color="#333" />} title="今日のメモ">
            <Text className="text-gray-700">まだメモはありません</Text>
          </Card>

          <Card icon={<MaterialIcons name="photo-album" size={24} color="#333" />} title="今日の写真">
            <Text className="text-gray-700">まだ写真はありません</Text>
          </Card>

          <Card icon={<MaterialIcons name="article" size={24} color="#333" />} title="最近の記事">
            <Text className="text-gray-700">まだ記事はありません</Text>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
