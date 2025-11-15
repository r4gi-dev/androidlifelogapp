import { useAuth } from '@/hooks/useAuth'; // Import useAuth
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Use the login function from context

  const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

  const handleLogin = async () => {
    if (!API_BASE_URL) {
      setError('API Base URL is not configured.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Assuming the backend returns user data on successful login
        // For now, using placeholder user data
        login({ id: 'some-user-id', email }); // Call login from context
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (e: any) {
      setError('Could not connect to the server.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1" // Ensure KeyboardAvoidingView covers full screen
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
                <Text className="text-lg text-white/80">Welcome back</Text>
              </View>

              <BlurView intensity={80} tint="light" className="p-8 rounded-2xl overflow-hidden">
                <View className="flex-row items-center border-b border-white/50 mb-4">
                  <Ionicons name="mail-outline" size={22} color="white" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-white placeholder:text-white/70" // Refined placeholder color
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
                    className="flex-1 ml-3 text-base text-white placeholder:text-white/70" // Refined placeholder color
                    placeholder="Password"
                    placeholderTextColor="#eee"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                {error ? <Text className="text-red-300 bg-red-700/50 rounded p-2 text-center mb-4 font-semibold">{error}</Text> : null} {/* Enhanced error message style */}

                <TouchableOpacity
                  className="bg-white/90 py-4 rounded-2xl shadow-md"
                  onPress={handleLogin}
                >
                  <Text className="text-blue-500 text-center font-bold text-lg">LOGIN</Text>
                </TouchableOpacity>
              </BlurView>

              <View className="flex-row justify-center mt-8">
                <Text className="text-white/80">Don&apos;t have an account?</Text>
                <Text>
                  <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text className="text-white font-bold">Sign up</Text>
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
