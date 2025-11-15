import React, { useState } from "react";
import { View, Text, Button, FlatList, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import Constants from 'expo-constants'; // Import Constants
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

export default function DiaryScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [newTask, setNewTask] = useState("");
  const { user } = useAuth(); // Get user from context

  const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL; // Get API_BASE_URL

  async function fetchTasks(date: string) {
    if (!API_BASE_URL) {
      console.error('API Base URL is not configured.');
      return;
    }
    if (!user?.id) { // Check if user and user.id exist
      console.error('User not authenticated or user ID not available.');
      return;
    }
    const user_id = user.id; // Use user ID from context
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?date=${date}&userId=${user_id}`);
      const data = await response.json();
      if (response.ok) {
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks:', data.message);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async function addTask() {
    if (!API_BASE_URL) {
      console.error('API Base URL is not configured.');
      return;
    }
    if (!user?.id) { // Check if user and user.id exist
      console.error('User not authenticated or user ID not available.');
      return;
    }
    const user_id = user.id; // Use user ID from context
    if (!selected) return;

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTask,
          date: selected,
          completed: false,
          user_id: user_id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setTasks([...tasks, data]);
        setNewTask("");
      } else {
        console.error('Failed to add task:', data.message);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  return (
    <View className="flex-1 p-3">
      <Calendar onDayPress={(day) => { setSelected(day.dateString); fetchTasks(day.dateString); }} />
      <TextInput
        className="border border-gray-300 my-3 p-2 rounded-md"
        placeholder="タスクを追加..."
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="追加" onPress={addTask} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => <Text className="p-3 border-b border-gray-200">{item.title}</Text>}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  );
}
