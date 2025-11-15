import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

export default function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter(); // Initialize useRouter

  const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

  const handleSignup = async () => {
    if (!API_BASE_URL) {
      setError('API Base URL is not configured.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login({ id: 'some-user-id', email });
      } else {
        setError(data.message || 'Failed to create account.');
      }
    } catch (e: any) {
      setError('Could not connect to the server.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <LinearGradient
        colors={['#a2d2ff', '#ffc8dd']}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          <StatusBar barStyle="dark-content" />
          <View className="flex-1 justify-center items-center p-6">
            <View className="w-full max-w-sm">
              <View className="items-center mb-10">
                <Text className="text-5xl font-bold text-white shadow-sm">LifeLog</Text>
                <Text className="text-lg text-white/80">Create your account</Text>
              </View>

              <BlurView intensity={80} tint="light" className="p-8 rounded-2xl overflow-hidden">
                <View className="flex-row items-center border-b border-white/50 mb-4">
                  <Ionicons name="mail-outline" size={22} color="white" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-white placeholder:text-white/70"
                    placeholder="Email Address"
                    placeholderTextColor="#eee"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                <View className="flex-row items-center border-b border-white/50 mb-6">
                  <MaterialCommunityIcons name="lock-outline" size={22} color="white" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-white placeholder:text-white/70"
                    placeholder="Password"
                    placeholderTextColor="#eee"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                {error ? <Text className="text-red-300 bg-red-700/50 rounded p-2 text-center mb-4 font-semibold">{error}</Text> : null}

                <TouchableOpacity
                  className="bg-white/90 py-4 rounded-2xl shadow-md"
                  onPress={handleSignup}
                >
                  <Text className="text-blue-500 text-center font-bold text-lg">SIGN UP</Text>
                </TouchableOpacity>
              </BlurView>

              <View className="flex-row justify-center mt-8">
                <Text className="text-white/80">Already have an account? </Text>
                <Text>
                  <TouchableOpacity onPress={() => router.push('/(auth)/login')}> {/* Use router.push for consistency */}
                    <Text className="text-white font-bold">Login</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}