import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('http://192.168.3.100:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigation.replace('Home');
      } else {
        setError(data.message || 'Failed to create account.');
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Text className="text-2xl text-center mb-5">アカウント作成</Text>
      <TextInput
        className="border border-gray-300 mb-3 p-3 rounded-md"
        placeholder="メールアドレス"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        className="border border-gray-300 mb-3 p-3 rounded-md"
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text className="text-red-500 mb-3">{error}</Text> : null}
      <View className="mb-2">
        <Button title="登録" onPress={handleSignup} />
      </View>
      <Button title="ログインへ戻る" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
