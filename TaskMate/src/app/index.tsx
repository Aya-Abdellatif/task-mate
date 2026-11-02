
import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [taskTitle, setTaskTitle] = useState('');

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Learn React Native',
      completed: false,
    },
    {
      id: '2',
      title: 'Build my first app',
      completed: true,
    },
  ]);

  function addTask() {
    if (!taskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      completed: false,
    };

    setTasks(previousTasks => [
      ...previousTasks,
      newTask,
    ]);

    setTaskTitle('');
  }

  function toggleTask(id: string) {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TaskMate</Text>

      <Text style={styles.subtitle}>
        Stay organized and productive.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          value={taskTitle}
          onChangeText={setTaskTitle}
        />

        <Pressable
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.taskItem}
            onPress={() => toggleTask(item.id)}
          >
            <Text style={styles.taskText}>
              {item.completed ? '✅' : '⬜'}{' '}
              {item.title}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add your first task!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4dff4',
    padding: 24,
    paddingTop: 70,
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0a34bc',
  },

  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 28,
  },

  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },

  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
  },

  addButton: {
    backgroundColor: '#2563EB',
    width: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 26,
  },

  taskItem: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },

  taskText: {
    fontSize: 16,
    color: '#1E293B',
  },

  emptyText: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 30,
  },
});
