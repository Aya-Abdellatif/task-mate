
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

  // Delete a task by id
  function deleteTask(id: string) {
    setTasks(previousTasks => previousTasks.filter(task => task.id !== id));
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
            <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
              {item.completed ? '✅' : '⬜'}{' '}
              {item.title}
            </Text>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
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
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    
    // layout: text left, delete button right
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  taskText: {
    fontSize: 16,
    color: '#1E293B',
    flexShrink: 1,
    marginRight: 12,
  },

  // applied when task.completed === true
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },

  deleteButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },

  deleteButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },

  emptyText: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 30,
  },
});
