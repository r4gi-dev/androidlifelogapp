import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router'; // Import useRouter
import Constants from 'expo-constants'; // Import Constants

const Card = ({ icon, title, children, onPress }: { icon: React.ReactNode, title: string, children: React.ReactNode, onPress?: () => void }) => (
  <BlurView intensity={80} tint="light" className="rounded-2xl overflow-hidden mb-6">
    <TouchableOpacity className="p-6" onPress={onPress}> {/* Add onPress prop */}
      <View className="flex-row items-center mb-4">
        {icon}
        <Text className="text-xl font-bold text-gray-800 ml-3">{title}</Text>
      </View>
      <View>{children}</View>
    </TouchableOpacity>
  </BlurView>
);

export default function HomeScreen() {
  const router = useRouter(); // Initialize useRouter
  const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL; // Get API_BASE_URL

  async function checkDbConnection() {
    if (!API_BASE_URL) {
      alert('API Base URL is not configured.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/test`);
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

          <Card
            icon={<MaterialIcons name="book" size={24} color="#333" />}
            title="今日のメモ"
            onPress={() => router.push('/diary')} // Navigate to diary tab
          >
            <Text className="text-gray-700">まだメモはありません</Text>
          </Card>

          <Card
            icon={<MaterialIcons name="photo-album" size={24} color="#333" />}
            title="今日の写真"
            onPress={() => router.push('/photos')} // Navigate to photos tab
          >
            <Text className="text-gray-700">まだ写真はありません</Text>
          </Card>

          <Card
            icon={<MaterialIcons name="article" size={24} color="#333" />}
            title="最近の記事"
            onPress={() => router.push('/articles')} // Navigate to articles tab
          >
            <Text className="text-gray-700">まだ記事はありません</Text>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}