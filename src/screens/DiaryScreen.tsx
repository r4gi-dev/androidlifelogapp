import React, { useState } from "react";
import { View, Text, Button, FlatList, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";

export default function DiaryScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [newTask, setNewTask] = useState("");

  async function fetchTasks(date: string) {
    // TODO: Replace hardcoded user_id with the actual logged-in user's ID
    const user_id = 1;
    try {
      const response = await fetch(`http://192.168.3.100:3001/tasks?date=${date}&userId=${user_id}`);
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
    // TODO: Replace hardcoded user_id with the actual logged-in user's ID
    const user_id = 1;
    if (!selected) return;

    try {
      const response = await fetch('http://192.168.3.100:3001/tasks', {
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
