import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, StatusBar } from "react-native"; // Removed Button, added TouchableOpacity
import { Calendar } from "react-native-calendars";
import Constants from 'expo-constants';
import { useAuth } from '@/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

export default function DiaryScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [newTask, setNewTask] = useState("");
  const { user } = useAuth();

  const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

  async function fetchTasks(date: string) {
    if (!API_BASE_URL) {
      console.error('API Base URL is not configured.');
      return;
    }
    if (!user?.id) {
      console.error('User not authenticated or user ID not available.');
      return;
    }
    const user_id = user.id;
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
    if (!user?.id) {
      console.error('User not authenticated or user ID not available.');
      return;
    }
    const user_id = user.id;
    if (!selected || !newTask.trim()) return; // Prevent adding empty tasks

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
    <LinearGradient
      colors={['#a2d2ff', '#ffc8dd']}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" />
        <View className="flex-1 p-3">
          <Text className="text-3xl font-bold text-white mb-4 text-center">My Diary</Text> {/* Added title */}
          <Calendar
            onDayPress={(day) => { setSelected(day.dateString); fetchTasks(day.dateString); }}
            markedDates={{
              [selected]: { selected: true, marked: true, selectedColor: '#a2d2ff' }
            }}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#fff',
              selectedDayBackgroundColor: '#a2d2ff',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#fff',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'white',
              monthTextColor: 'white',
              indicatorColor: 'white',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
            className="mb-4 rounded-lg overflow-hidden" // Added styling to calendar container
          />
          <View className="flex-row items-center mb-4">
            <TextInput
              className="flex-1 border border-white/50 bg-white/20 text-white my-3 p-3 rounded-md placeholder:text-white/70"
              placeholder="タスクを追加..."
              placeholderTextColor="#eee"
              value={newTask}
              onChangeText={setNewTask}
            />
            <TouchableOpacity
              className="bg-white/50 py-3 px-5 rounded-md ml-2"
              onPress={addTask}
            >
              <Text className="text-white font-bold">追加</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <View className="bg-white/30 p-3 rounded-md mb-2">
                <Text className="text-white text-base">{item.title}</Text>
              </View>
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            className="flex-1"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}