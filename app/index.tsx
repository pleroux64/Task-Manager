import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/task';

/**
 * Main screen of the Task Manager app.
 * Handles task input, creation, completion toggling, and deletion.
 */
export default function Index() {
  // State
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  // Derived state
  const sections = useMemo(() => {
    const todoTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);
    
    return [
      { title: 'To Do', data: todoTasks },
      ...(completedTasks.length > 0 ? [{ title: 'Completed', data: completedTasks }] : [])
    ];
  }, [tasks]);

  // Task operations
  const addTask = () => {
    if (!taskText.trim()) {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    setTasks(prev => [
      { id: Date.now().toString(), text: taskText.trim(), completed: false },
      ...prev,
    ]);
    setTaskText('');
  };

  const toggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // UI Components
  const renderSectionHeader = ({ section: { title, data } }: {
    section: { title: string; data: Task[] }
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.countBadge}>
        <Text style={styles.taskCount}>{data.length}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggleComplete={() => toggleComplete(item.id)}
      onDelete={() => deleteTask(item.id)}
    />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Text style={styles.title}>Tasks</Text>

      {/* Task input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          value={taskText}
          onChangeText={setTaskText}
          returnKeyType="done"
          onSubmitEditing={addTask}
          maxLength={100}
        />
        <TouchableOpacity
          onPress={addTask}
          style={[styles.addButton, !taskText.trim() && styles.addButtonDisabled]}
          disabled={!taskText.trim()}
        >
          <MaterialCommunityIcons
            name="plus"
            size={22}
            color={taskText.trim() ? 'white' : 'rgba(0, 0, 0, 0.2)'}
          />
        </TouchableOpacity>
      </View>

      <SectionList
        contentContainerStyle={styles.listContent}
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No tasks to do</Text>
        }
        stickySectionHeadersEnabled={false}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 16,
    marginTop: 60,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 32,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  addButtonDisabled: {
    backgroundColor: '#F0F0F0',
  },
  listContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  countBadge: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  taskCount: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  emptyMessage: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 16,
    marginTop: 20,
    fontWeight: '500',
  },
});